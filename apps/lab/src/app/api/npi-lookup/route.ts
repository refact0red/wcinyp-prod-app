import { NextResponse } from "next/server";
import type {
    NormalizedAddress,
    NormalizedEndpoint,
    NormalizedIdentifier,
    NormalizedNpiRecord,
    NormalizedTaxonomy,
} from "@/app/npi-lookup/types";

const CMS_REGISTRY_URL = "https://npiregistry.cms.hhs.gov/api/";
const NPI_REGEX = /^\d{10}$/;
const REQUEST_TIMEOUT_MS = 8000;

type RegistryBasic = {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    name_prefix?: string;
    credential?: string;
    organization_name?: string;
    gender?: string;
    status?: string;
    sole_proprietor?: string;
    enumeration_date?: string;
    last_updated?: string;
    certification_date?: string;
};

type RegistryAddress = {
    address_purpose?: string;
    address_type?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country_code?: string;
    country_name?: string;
    telephone_number?: string;
    fax_number?: string;
};

type RegistryTaxonomy = {
    code?: string;
    desc?: string;
    state?: string;
    license?: string;
    primary?: boolean;
};

type RegistryIdentifier = {
    issuer?: string;
    state?: string;
    identifier?: string;
    desc?: string;
    code?: string;
};

type RegistryEndpoint = {
    endpoint?: string;
    endpoint_type?: string;
    endpointType?: string;
    endpoint_description?: string;
    endpointDescription?: string;
    use?: string;
    use_description?: string;
    useDescription?: string;
    content_type?: string;
    contentType?: string;
    content_type_description?: string;
    contentTypeDescription?: string;
    affiliation?: string;
    address?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country_name?: string;
};

type RegistryResult = {
    number?: string;
    enumeration_type?: string;
    basic?: RegistryBasic;
    addresses?: RegistryAddress[];
    taxonomies?: RegistryTaxonomy[];
    identifiers?: RegistryIdentifier[];
    endpoints?: RegistryEndpoint[];
};

type RegistryResponse = {
    results?: RegistryResult[];
};

const formatPostalCode = (value?: string) => {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");
    if (digits.length === 9) {
        return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }
    return value;
};

const formatName = (basic: RegistryBasic | undefined, npi: string) => {
    if (!basic) return npi;

    if (basic.organization_name) return basic.organization_name;

    const parts = [basic.name_prefix, basic.first_name, basic.middle_name, basic.last_name].filter(Boolean);
    const base = parts.join(" ").trim();
    const credential = basic.credential ? ` ${basic.credential}` : "";

    return (base + credential).trim() || npi;
};

const mapStatus = (status?: string) => {
    if (!status) return undefined;
    if (status.toUpperCase() === "A") return "Active";
    if (status.toUpperCase() === "I") return "Inactive";
    return status;
};

const mapGender = (gender?: string) => {
    if (!gender) return undefined;
    if (gender.toUpperCase() === "F") return "Female";
    if (gender.toUpperCase() === "M") return "Male";
    return gender;
};

const formatNpiType = (type?: string) => {
    if (!type) return undefined;
    if (type.toUpperCase().includes("2")) return "NPI-2 Organization";
    return "NPI-1 Individual";
};

const formatAddress = (address: RegistryAddress | undefined): NormalizedAddress | undefined => {
    if (!address) return undefined;

    const postal = formatPostalCode(address.postal_code);
    const cityState = [address.city, address.state].filter(Boolean).join(", ");
    const cityLine = [cityState, postal].filter(Boolean).join(" ").trim();

    const lines = [address.address_1, address.address_2, cityLine, address.country_name].filter(Boolean).map((value) => value!.trim());

    const contact: string[] = [];
    if (address.telephone_number) contact.push(`Phone: ${address.telephone_number}`);
    if (address.fax_number) contact.push(`Fax: ${address.fax_number}`);
    if (contact.length) {
        lines.push(contact.join(" | "));
    }

    return { lines, purpose: address.address_purpose };
};

const formatEndpointLocation = (endpoint: RegistryEndpoint): string => {
    const postal = formatPostalCode(endpoint.postal_code);
    const cityState = [endpoint.city, endpoint.state].filter(Boolean).join(", ");
    const cityLine = [cityState, postal].filter(Boolean).join(" ").trim();

    return [endpoint.address, endpoint.address_1, endpoint.address_2, cityLine, endpoint.country_name].filter(Boolean).join("\n").trim();
};

const normalizeResult = (result: RegistryResult): NormalizedNpiRecord => {
    const basic = result.basic;
    const addresses = result.addresses ?? [];
    const mailing = addresses.find((address) => address.address_purpose === "MAILING");
    const practiceLocations = addresses.filter((address) => address.address_purpose === "LOCATION");

    return {
        npi: result.number ?? "",
        displayName: formatName(basic, result.number ?? ""),
        gender: mapGender(basic?.gender),
        npiType: formatNpiType(result.enumeration_type),
        status: mapStatus(basic?.status),
        soleProprietor: basic?.sole_proprietor,
        enumerationDate: basic?.enumeration_date,
        lastUpdated: basic?.last_updated,
        certificationDate: basic?.certification_date,
        mailingAddress: formatAddress(mailing),
        primaryPracticeAddress: formatAddress(practiceLocations[0]),
        secondaryPracticeAddresses: practiceLocations.slice(1).map((address) => formatAddress(address)).filter(Boolean) as NormalizedAddress[],
        taxonomies: (result.taxonomies ?? []).map(
            (taxonomy): NormalizedTaxonomy => ({
                primary: taxonomy.primary,
                code: taxonomy.code,
                desc: taxonomy.desc,
                state: taxonomy.state,
                license: taxonomy.license,
            }),
        ),
        identifiers: (result.identifiers ?? []).map(
            (identifier): NormalizedIdentifier => ({
                issuer: identifier.issuer,
                state: identifier.state,
                number: identifier.identifier,
                desc: identifier.desc,
                code: identifier.code,
            }),
        ),
        endpoints: (result.endpoints ?? []).map(
            (endpoint): NormalizedEndpoint => ({
                endpointType: endpoint.endpoint_type ?? endpoint.endpointType,
                endpoint: endpoint.endpoint,
                endpointDescription: endpoint.endpoint_description ?? endpoint.endpointDescription,
                use: endpoint.use_description ?? endpoint.useDescription ?? endpoint.use,
                contentType: endpoint.content_type_description ?? endpoint.contentTypeDescription ?? endpoint.content_type ?? endpoint.contentType,
                affiliation: endpoint.affiliation,
                location: formatEndpointLocation(endpoint) || undefined,
            }),
        ),
    };
};

const buildTimeoutSignal = () => {
    try {
        if (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) {
            return AbortSignal.timeout(REQUEST_TIMEOUT_MS);
        }
    } catch (error) {
        return undefined;
    }

    return undefined;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const npi = searchParams.get("npi")?.trim();

    if (!npi || !NPI_REGEX.test(npi)) {
        return NextResponse.json({ error: "INVALID_INPUT", message: "Enter a 10-digit NPI to search." }, { status: 400 });
    }

    const url = `${CMS_REGISTRY_URL}?version=2.1&number=${encodeURIComponent(npi)}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
            next: { revalidate: 0 },
            signal: buildTimeoutSignal(),
        });

        if (!response.ok) {
            const status = response.status;
            if (status === 404) {
                return NextResponse.json({ error: "NOT_FOUND", message: `No results found for NPI ${npi}.` }, { status: 404 });
            }
            if (status === 429) {
                return NextResponse.json(
                    { error: "RATE_LIMITED", message: "NPI Registry rate limit reached. Try again in a moment." },
                    { status: 429 },
                );
            }

            return NextResponse.json(
                { error: "UPSTREAM_ERROR", message: "The NPI Registry returned an error. Please try again later." },
                { status: 502 },
            );
        }

        const payload = (await response.json()) as RegistryResponse;

        if (!payload.results?.length) {
            return NextResponse.json({ error: "NOT_FOUND", message: `No results found for NPI ${npi}.` }, { status: 404 });
        }

        const normalized = normalizeResult(payload.results[0]);

        return NextResponse.json({ data: normalized, source: "NPPES NPI Registry" });
    } catch (error) {
        const isAbortError = error instanceof Error && error.name === "TimeoutError";
        const message = isAbortError ? "NPI Registry timed out. Try again in a moment." : "NPI Registry is unavailable right now.";
        const status = isAbortError ? 504 : 503;

        return NextResponse.json({ error: "UPSTREAM_UNAVAILABLE", message }, { status });
    }
}

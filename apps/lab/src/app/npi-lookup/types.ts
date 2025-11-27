export type NormalizedAddress = {
    lines: string[];
    purpose?: string;
};

export type NormalizedTaxonomy = {
    primary?: boolean;
    code?: string;
    desc?: string;
    state?: string;
    license?: string;
};

export type NormalizedIdentifier = {
    issuer?: string;
    state?: string;
    number?: string;
    desc?: string;
    code?: string;
};

export type NormalizedEndpoint = {
    endpointType?: string;
    endpoint?: string;
    endpointDescription?: string;
    use?: string;
    contentType?: string;
    affiliation?: string;
    location?: string;
};

export type NormalizedNpiRecord = {
    npi: string;
    displayName: string;
    gender?: string;
    npiType?: string;
    status?: string;
    soleProprietor?: string;
    enumerationDate?: string;
    lastUpdated?: string;
    certificationDate?: string;
    mailingAddress?: NormalizedAddress;
    primaryPracticeAddress?: NormalizedAddress;
    secondaryPracticeAddresses: NormalizedAddress[];
    taxonomies: NormalizedTaxonomy[];
    identifiers: NormalizedIdentifier[];
    endpoints: NormalizedEndpoint[];
};

export type NpiLookupResponse = {
    data: NormalizedNpiRecord;
    source?: string;
};

export type NpiLookupError = {
    error: string;
    message: string;
};

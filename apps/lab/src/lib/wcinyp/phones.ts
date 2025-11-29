export type WcinypPhoneNumber = {
    /**
     * Canonical numeric representation, digits only (e.g. "6469624704").
     */
    digits: string;
};

export type WcinypPhoneGroup = {
    /**
     * Primary phone number for this contact.
     */
    primary: WcinypPhoneNumber;
    /**
     * Optional extensions that share the same primary line.
     * For example: 646.962.9729/9288/9289 -> primary.digits "6469629729", extensions ["9288", "9289"].
     */
    extensions?: string[];
    /**
     * Optional additional full phone numbers that are distinct from the primary.
     */
    others?: WcinypPhoneNumber[];
};

const sanitizeDigits = (value: string) => value.replace(/[^\d]/g, "");

// WCINYP internal-dial prefix for full external numbers that can be dialed
// internally using a 7-digit code (e.g. 646-962-4704 -> 9624704).
const INTERNAL_EXTENSION_PREFIX = "646962";

export const isInternalExtension = (value: string | WcinypPhoneNumber): boolean => {
    const digits = typeof value === "string" ? value : value.digits;
    const cleaned = sanitizeDigits(digits);
    return cleaned.length === 10 && cleaned.startsWith(INTERNAL_EXTENSION_PREFIX);
};

export const getInternalExtensionCode = (value: string | WcinypPhoneNumber): string | null => {
    if (!isInternalExtension(value)) return null;
    const digits = typeof value === "string" ? value : value.digits;
    const cleaned = sanitizeDigits(digits);
    // 6469624704 -> "9624704"
    return cleaned.slice(-7);
};

export const createPhoneNumber = (value: string): WcinypPhoneNumber => ({
    digits: sanitizeDigits(value),
});

export const formatPhoneDigits = (digits: string): string => {
    const cleaned = sanitizeDigits(digits);

    if (cleaned.length === 10) {
        const area = cleaned.slice(0, 3);
        const prefix = cleaned.slice(3, 6);
        const line = cleaned.slice(6);
        return `${area}.${prefix}.${line}`;
    }

    // Fallback for non-standard lengths.
    return cleaned || digits;
};

export const formatPhoneGroup = (group?: WcinypPhoneGroup): string => {
    if (!group) return "";

    const parts: string[] = [];

    parts.push(formatPhoneDigits(group.primary.digits));

    if (group.extensions?.length) {
        parts.push(...group.extensions);
    }

    if (group.others?.length) {
        parts.push(...group.others.map((number) => formatPhoneDigits(number.digits)));
    }

    return parts.join("/");
};

export const phoneHref = (digits: string): string => {
    const cleaned = sanitizeDigits(digits);
    return cleaned ? `tel:${cleaned}` : "";
};

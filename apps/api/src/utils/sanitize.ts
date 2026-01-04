export function sanitizeHtml(input: string): string {
    if (!input || typeof input !== 'string') return '';

    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

export function sanitizeFirstName(firstName: string): string {
    if (!firstName || typeof firstName !== 'string') return '';
    return sanitizeHtml(firstName.trim());
}

export function sanitizeStringArray(arr: unknown): string[] {
    if (!Array.isArray(arr)) return [];
    return arr
        .filter((item): item is string => typeof item === 'string')
        .map((item) => sanitizeHtml(item.trim()));
}

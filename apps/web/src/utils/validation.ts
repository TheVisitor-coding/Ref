export const FIRSTNAME_REGEX = /^[a-zA-Z\u00C0-\u017F\s'-]+$/;
export const FIRSTNAME_REGEX_ALLOW_EMPTY = /^[a-zA-Z\u00C0-\u017F\s'-]*$/;
export const FIRSTNAME_ERROR_MESSAGE = 'Le prénom ne peut contenir que des lettres';
export const FIRSTNAME_MIN_LENGTH = 1;
export const FIRSTNAME_MAX_LENGTH = 50;

export function isValidFirstName(firstName: string): boolean {
    if (!firstName || typeof firstName !== 'string') return false;
    const trimmed = firstName.trim();
    return (
        trimmed.length >= FIRSTNAME_MIN_LENGTH &&
        trimmed.length <= FIRSTNAME_MAX_LENGTH &&
        FIRSTNAME_REGEX.test(trimmed)
    );
}

export function canTypeInFirstName(value: string): boolean {
    return value === '' || FIRSTNAME_REGEX_ALLOW_EMPTY.test(value);
}

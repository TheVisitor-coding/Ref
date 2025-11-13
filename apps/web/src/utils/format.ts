const FALLBACK_VALUE = "N/A";

export const isEmptyValue = (value: unknown): boolean => {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === "string") {
        return value.trim().length === 0;
    }

    return false;
};

export const formatOptional = (value: string | number | null | undefined): string => {
    if (isEmptyValue(value)) {
        return FALLBACK_VALUE;
    }

    return String(value);
};

export const formatMeasurement = (value: number | null | undefined, unit: string): string => {
    if (isEmptyValue(value)) {
        return FALLBACK_VALUE;
    }

    return `${value} ${unit}`;
};

export const formatDateLocalized = (value: string | null | undefined, locale = "fr-FR"): string => {
    if (!value) {
        return FALLBACK_VALUE;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return FALLBACK_VALUE;
    }

    return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const getFallbackValue = () => FALLBACK_VALUE;

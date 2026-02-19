import {
    isEmptyValue,
    formatOptional,
    formatMeasurement,
    formatDateLocalized,
    getFallbackValue
} from '@/utils/format';

describe('Format Utils', () => {
    describe('isEmptyValue', () => {
        it('should return true for null', () => {
            expect(isEmptyValue(null)).toBe(true);
        });
        it('should return true for undefined', () => {
            expect(isEmptyValue(undefined)).toBe(true);
        });
        it('should return true for empty string (trimmed)', () => {
            expect(isEmptyValue('')).toBe(true);
            expect(isEmptyValue('   ')).toBe(true);
        });
        it('should return false for number 0', () => {
            expect(isEmptyValue(0)).toBe(false);
        });
        it('should return false for valid string', () => {
            expect(isEmptyValue('hello')).toBe(false);
        });
    });

    describe('formatOptional', () => {
        it('should return fallback for empty values', () => {
            expect(formatOptional(null)).toBe('N/A');
            expect(formatOptional(undefined)).toBe('N/A');
            expect(formatOptional('')).toBe('N/A');
        });
        it('should return stringified value for non-empty', () => {
            expect(formatOptional(123)).toBe('123');
            expect(formatOptional('test')).toBe('test');
            expect(formatOptional(0)).toBe('0');
        });
    });

    describe('formatMeasurement', () => {
        it('should return fallback for empty value', () => {
            expect(formatMeasurement(null, 'cm')).toBe('N/A');
        });
        it('should return formatted string for number', () => {
            expect(formatMeasurement(180, 'cm')).toBe('180 cm');
        });
    });

    describe('formatDateLocalized', () => {
        it('should return fallback for invalid value', () => {
            expect(formatDateLocalized(null)).toBe('N/A');
            expect(formatDateLocalized('')).toBe('N/A');
        });
        it('should return fallback for invalid date string', () => {
            expect(formatDateLocalized('invalid-date')).toBe('N/A');
        });
        it('should format valid date correctly', () => {
            // Use specific locale to ensure consistency
            const dateStr = '2024-01-01';
            const result = formatDateLocalized(dateStr, 'fr-FR');
            expect(result).toMatch(/1 janvier 2024/i);
        });
    });

    describe('getFallbackValue', () => {
        it('should return constant fallback value', () => {
            expect(getFallbackValue()).toBe('N/A');
        });
    });
});

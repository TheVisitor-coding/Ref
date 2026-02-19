import { isValidFirstName, canTypeInFirstName } from '@/utils/validation';

describe('Validation Utils', () => {
    describe('isValidFirstName', () => {
        it('should return true for valid name', () => {
            expect(isValidFirstName('Jean-Pierre')).toBe(true);
            expect(isValidFirstName('Alice')).toBe(true);
            expect(isValidFirstName('Élise')).toBe(true); // Accents
        });

        it('should return false for invalid types (null, undefined, number)', () => {
            // @ts-expect-error testing invalid runtime input type
            expect(isValidFirstName(null)).toBe(false);
            // @ts-expect-error testing invalid runtime input type
            expect(isValidFirstName(undefined)).toBe(false);
            // @ts-expect-error testing invalid runtime input type
            expect(isValidFirstName(123)).toBe(false);
        });

        it('should return false for empty string', () => {
            expect(isValidFirstName('')).toBe(false);
            expect(isValidFirstName('   ')).toBe(false);
        });

        it('should return false if length is out of bounds', () => {
            const longName = 'a'.repeat(51);
            expect(isValidFirstName(longName)).toBe(false);
        });

        it('should return false for invalid characters', () => {
            expect(isValidFirstName('John123')).toBe(false);
            expect(isValidFirstName('John@Doe')).toBe(false);
        });
    });

    describe('canTypeInFirstName', () => {
        it('should return true for empty string', () => {
            expect(canTypeInFirstName('')).toBe(true);
        });

        it('should return true for partial valid input', () => {
            expect(canTypeInFirstName('Je')).toBe(true);
            expect(canTypeInFirstName('Je-')).toBe(true);
        });

        it('should return false for invalid input', () => {
            expect(canTypeInFirstName('123')).toBe(false);
            expect(canTypeInFirstName('John@')).toBe(false);
        });
    });
});

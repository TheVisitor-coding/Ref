import { diffChanges, pick } from '@/utils/diffChanges';

describe('diffChanges Utils', () => {
    describe('pick', () => {
        it('should pick specified keys from object', () => {
            const obj = { a: 1, b: 2, c: 3 };
            const result = pick(obj, ['a', 'c']);
            expect(result).toEqual({ a: 1, c: 3 });
            expect(result).not.toHaveProperty('b');
        });

        it('should handle missing keys gracefully (returns undefined for them)', () => {
            const obj = { a: 1 };
            // @ts-expect-error testing key not present in source object
            const result = pick(obj, ['a', 'b']);
            expect(result).toEqual({ a: 1, b: undefined });
        });
    });

    describe('diffChanges', () => {
        it('should detect changes in specified keys', () => {
            const before = { a: 1, b: 2 };
            const after = { a: 1, b: 3 };
            const result = diffChanges(before, after, ['a', 'b']);

            expect(result.old_values).toEqual({ b: 2 });
            expect(result.new_values).toEqual({ b: 3 });
        });

        it('should return empty objects if no changes', () => {
            const before = { a: 1, b: 2 };
            const after = { a: 1, b: 2 };
            const result = diffChanges(before, after, ['a', 'b']);

            expect(result.old_values).toEqual({});
            expect(result.new_values).toEqual({});
        });

        it('should handle null vs undefined as no change', () => {
            const before: { a: number | null | undefined } = { a: null };
            const after: { a: number | null | undefined } = { a: undefined };
            const result = diffChanges(before, after, ['a']);

            expect(result.old_values).toEqual({});
            expect(result.new_values).toEqual({});
        });

        it('should detect change from value to null', () => {
            const before = { a: 1 };
            const after = { a: null };
            // @ts-expect-error testing type transition to null
            const result = diffChanges(before, after, ['a']);

            expect(result.old_values).toEqual({ a: 1 });
            expect(result.new_values).toEqual({ a: null });
        });

        it('should detect change using JSON stringify comparison (arrays/objects)', () => {
            const before = { a: [1, 2] };
            const after = { a: [1, 3] };
            const result = diffChanges(before, after, ['a']);

            expect(result.old_values).toEqual({ a: [1, 2] });
            expect(result.new_values).toEqual({ a: [1, 3] });
        });
    });
});

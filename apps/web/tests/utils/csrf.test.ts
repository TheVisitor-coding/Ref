import { verifyCsrfToken, invalidateCsrfToken } from '@/utils/csrf';
import { cookies } from 'next/headers';

// Mock next/headers
jest.mock('next/headers', () => ({
    cookies: jest.fn(),
}));

describe('CSRF Utils', () => {
    describe('verifyCsrfToken', () => {
        let mockCookies: {
            get: jest.Mock;
            delete: jest.Mock;
        };

        beforeEach(() => {
            // Mock the cookie store
            mockCookies = {
                get: jest.fn(),
                delete: jest.fn(),
            };
            (cookies as jest.Mock).mockResolvedValue(mockCookies);
        });

        it('should return false if x-csrf-token header is missing', async () => {
            const request = new Request('http://localhost');
            const result = await verifyCsrfToken(request);
            expect(result).toBe(false);
        });

        it('should return false if csrf-token cookie is missing', async () => {
            const request = new Request('http://localhost', {
                headers: { 'x-csrf-token': 'token123' },
            });
            mockCookies.get.mockReturnValue(undefined);

            const result = await verifyCsrfToken(request);
            expect(result).toBe(false);
        });

        it('should return false if tokens do not match', async () => {
            const request = new Request('http://localhost', {
                headers: { 'x-csrf-token': 'token123' },
            });
            mockCookies.get.mockReturnValue({ value: 'token456' });

            const result = await verifyCsrfToken(request);
            expect(result).toBe(false);
        });

        it('should return false if tokens have different lengths', async () => {
            const request = new Request('http://localhost', {
                headers: { 'x-csrf-token': 'token123' },
            });
            mockCookies.get.mockReturnValue({ value: 'token1234' });

            const result = await verifyCsrfToken(request);
            expect(result).toBe(false);
        });

        it('should return true if tokens match', async () => {
            const request = new Request('http://localhost', {
                headers: { 'x-csrf-token': 'token123' },
            });
            mockCookies.get.mockReturnValue({ value: 'token123' });

            const result = await verifyCsrfToken(request);
            expect(result).toBe(true);
        });
    });

    describe('invalidateCsrfToken', () => {
        it('should delete the csrf-token cookie', async () => {
            const mockCookies = {
                delete: jest.fn(),
            };
            (cookies as jest.Mock).mockResolvedValue(mockCookies);

            await invalidateCsrfToken();
            expect(mockCookies.delete).toHaveBeenCalledWith('csrf-token');
        });
    });
});

import { loginUser, registerCoach, AuthError } from '@/services/authService';

// Mock global fetch
global.fetch = jest.fn();

describe('AuthService', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
        jest.restoreAllMocks();
    });

    describe('loginUser', () => {
        it('should login successfully', async () => {
            const mockResponse = { user: { id: 1, email: 'test@example.com' }, message: 'Success' };
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await loginUser({ identifier: 'test@test.com', password: 'password' });

            expect(fetch).toHaveBeenCalledWith('/api/auth/login', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ identifier: 'test@test.com', password: 'password' }),
            }));
            expect(result).toEqual(mockResponse);
        });

        it('should throw AuthError on failed login', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 401,
                json: async () => ({ error: { message: 'Invalid credentials', name: 'AUTH_ERROR' } }),
            });

            await expect(loginUser({ identifier: 'test@test.com', password: 'wrong' }))
                .rejects
                .toThrow(AuthError);
        });
    });

    describe('registerCoach', () => {
        const mockRegisterData = {
            email: 'new@example.com',
            password: 'password',
            onboardingData: {} as any,
        };

        it('should register successfully', async () => {
            // Mock CSRF token fetch
            (global.fetch as jest.Mock)
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ csrfToken: 'fake-csrf-token' }),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ user: { id: 1 }, message: 'Registered' }),
                });

            const result = await registerCoach(mockRegisterData);

            expect(fetch).toHaveBeenCalledWith('/api/auth/csrf-token', expect.any(Object));
            expect(fetch).toHaveBeenCalledWith('/api/auth/register', expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'X-CSRF-Token': 'fake-csrf-token',
                }),
            }));
            expect(result).toEqual({ user: { id: 1 }, message: 'Registered' });
        });

        it('should retry on network error', async () => {
            // Mock CSRF token fetch success
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ csrfToken: 'token' }),
            });

            // Mock first register attempt failure
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 502, // Retryable status
                json: async () => ({}),
            });

            // Mock CSRF token fetch for retry
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ csrfToken: 'token' }),
            });

            // Mock second register attempt success
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ user: { id: 1 }, message: 'Success' }),
            });

            // Mock setTimeout to resolve immediately
            jest.spyOn(global, 'setTimeout').mockImplementation((fn: any) => {
                if (typeof fn === 'function') fn();
                return {} as any;
            });

            const result = await registerCoach(mockRegisterData);

            expect(fetch).toHaveBeenCalledTimes(4); // 1 CSRF + 1 Fail + 1 CSRF + 1 Success
            expect(result).toEqual({ user: { id: 1 }, message: 'Success' });
        });
    });
});

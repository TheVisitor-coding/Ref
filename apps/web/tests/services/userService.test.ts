import { getUserInfo, getMeId } from '@/services/userService';

global.fetch = jest.fn();

describe('userService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUserInfo', () => {
        it('should return user info on success', async () => {
            const mockUser = { id: 1, email: 'test@test.com' };
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            const result = await getUserInfo('token');
            expect(result).toEqual(mockUser);
        });

        it('should return null on failure', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 401,
                statusText: 'Unauthorized',
            });

            const result = await getUserInfo('token');
            expect(result).toBeNull();
        });
    });

    describe('getMeId', () => {
        it('should return user id', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 123 }),
            });

            const result = await getMeId('token');
            expect(result).toBe(123);
        });

        it('should throw error on failure', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Error',
            });

            await expect(getMeId('token')).rejects.toThrow('Strapi /users/me: 500 Error');
        });
    });
});

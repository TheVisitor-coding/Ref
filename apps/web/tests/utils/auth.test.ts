import { verifyToken } from '@/utils/auth';
import { jwtVerify } from 'jose';

// Mock jose
jest.mock('jose', () => ({
    jwtVerify: jest.fn(),
}));

describe('Auth Utils', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.clearAllMocks();
        process.env = { ...originalEnv };
        process.env.JWT_SECRET = 'test-secret';
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    describe('verifyToken', () => {
        it('should return payload if token is valid', async () => {
            const mockPayload = { id: 1, role: 'coach', permissions: [] };
            (jwtVerify as jest.Mock).mockResolvedValue({ payload: mockPayload });

            const result = await verifyToken('valid-token');
            expect(result).toEqual(mockPayload);
            expect(jwtVerify).toHaveBeenCalledWith('valid-token', expect.any(Uint8Array));
        });

        it('should return null if JWT_SECRET is not defined', async () => {
            delete process.env.JWT_SECRET;
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            const result = await verifyToken('any-token');
            expect(result).toBeNull();
            expect(consoleSpy).toHaveBeenCalledWith('Token verification failed:', expect.any(Error));

            consoleSpy.mockRestore();
        });

        it('should return null if verification fails', async () => {
            (jwtVerify as jest.Mock).mockRejectedValue(new Error('Invalid token'));
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            const result = await verifyToken('invalid-token');
            expect(result).toBeNull();
            expect(consoleSpy).toHaveBeenCalledWith('Token verification failed:', expect.any(Error));

            consoleSpy.mockRestore();
        });
    });
});

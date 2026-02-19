import { addSessionForAthlete, fetchSessionsForAthlete } from '@/services/sessionService';
import { getTokenFromCookie } from '@/actions/auth-actions';
import { getMeId } from '@/services/userService';

jest.mock('@/actions/auth-actions', () => ({
    getTokenFromCookie: jest.fn(),
}));

jest.mock('@/services/userService', () => ({
    getMeId: jest.fn(),
}));

jest.mock('@/actions/log-actions', () => ({
    addLogAction: jest.fn(),
}));

global.fetch = jest.fn();

describe('sessionService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addSessionForAthlete', () => {
        it('should add session successfully', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');
            (getMeId as jest.Mock).mockResolvedValue(10);

            const payload = { name: 'Workout' } as any;
            const mockResponseData = { documentId: 'doc1', ...payload };

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: mockResponseData }),
            });

            const result = await addSessionForAthlete(1, payload);
            expect(result).toEqual(mockResponseData);
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/sessions'), expect.objectContaining({ method: 'POST' }));
        });
    });

    describe('fetchSessionsForAthlete', () => {
        it('should fetch sessions successfully', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');
            (getMeId as jest.Mock).mockResolvedValue(10);

            const mockSessions = [{ id: 1 }];
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: mockSessions }),
            });

            const result = await fetchSessionsForAthlete(1);
            expect(result).toEqual(mockSessions);
        });
    });
});

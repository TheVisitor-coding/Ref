import { fetchCoachEvents, createCoachEvent, deleteCoachEvent } from '@/services/eventService';
import { getTokenFromCookie } from '@/actions/auth-actions';
import { getMeId } from '@/services/userService';

jest.mock('@/actions/auth-actions', () => ({
    getTokenFromCookie: jest.fn(),
}));

jest.mock('@/services/userService', () => ({
    getMeId: jest.fn(),
}));

global.fetch = jest.fn();

describe('eventService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchCoachEvents', () => {
        it('should fetch events successfully', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');
            (getMeId as jest.Mock).mockResolvedValue(10);

            const mockEvents = [{ id: 1, title: 'Training' }];
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: mockEvents }),
            });

            const result = await fetchCoachEvents();
            expect(result).toEqual(mockEvents);
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/coach-events'), expect.any(Object));
        });
    });

    describe('createCoachEvent', () => {
        it('should create event successfully', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');
            (getMeId as jest.Mock).mockResolvedValue(10);

            const payload = { title: 'New Event', start: '2024-01-01' } as any;
            const mockCreated = { id: 2, ...payload };

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: mockCreated }),
            });

            const result = await createCoachEvent(payload);
            expect(result).toEqual(mockCreated);
        });
    });

    describe('deleteCoachEvent', () => {
        it('should delete event successfully', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({}),
            });

            await deleteCoachEvent('doc123');
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/coach-events/doc123'), expect.objectContaining({ method: 'DELETE' }));
        });
    });
});

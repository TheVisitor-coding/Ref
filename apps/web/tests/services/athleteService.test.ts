import { fetchCoachAthletesServer, fetchCoachAthleteById, updateAthleteById } from '@/services/athleteService';
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

describe('athleteService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchCoachAthletesServer', () => {
        it('should return empty array if no token', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue(null);
            const result = await fetchCoachAthletesServer();
            expect(result).toEqual([]);
        });

        it('should fetch athletes successfully', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');
            const mockAthletes = [{ id: 1, first_name: 'John' }];
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: mockAthletes }),
            });

            const result = await fetchCoachAthletesServer();
            expect(result).toEqual(mockAthletes);
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/coach/athletes'), expect.any(Object));
        });
    });

    describe('fetchCoachAthleteById', () => {
        it('should return null if no token', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue(null);
            const result = await fetchCoachAthleteById(1);
            expect(result).toBeNull();
        });

        it('should fetch athlete successfully', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');
            (getMeId as jest.Mock).mockResolvedValue(10);

            const mockAthlete = {
                id: 1,
                athlete_relations: {
                    data: [{ id: 100, coach: { id: 10 } }]
                }
            };

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => [mockAthlete], // json() returns array for this endpoint
            });

            const result = await fetchCoachAthleteById(1);
            expect(result).toBeDefined();
            expect(result?.id).toBe(1);
        });
    });

    describe('updateAthleteById', () => {
        it('should update athlete successfully', async () => {
            (getTokenFromCookie as jest.Mock).mockResolvedValue('token');
            (getMeId as jest.Mock).mockResolvedValue(10);

            const mockAthlete = {
                id: 1,
                first_name: 'Old',
                athlete_relations: { // raw from API
                    data: [{ id: 100, coach: { id: 10 }, documentId: 'doc123' }]
                }
            };
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => [mockAthlete],
            });

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: {} }),
            });

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: {} }),
            });

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => [{ ...mockAthlete, first_name: 'New' }],
            });

            const result = await updateAthleteById(1, {
                first_name: 'New',
                last_name: 'Doe',
                email: 'test@example.com',
                relation_notes: 'Notes',
                height: undefined,
                weight: undefined,
                birth_date: undefined,
                discipline: undefined,
                mainObjective: undefined,
                secondaryObjective: undefined
            });
            expect(result.first_name).toBe('New');
        });
    });
});

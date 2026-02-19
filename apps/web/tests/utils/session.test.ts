import {
    toSessionDisplay,
    getSessionsForDate,
    getSessionForDate,
    hasSessionOnDate,
    getSessionsForWeek
} from '@/utils/session';
import { Session } from '@/types/Session';

// Mock dependency
jest.mock('@/data/sports/sportsList', () => ({
    normalizeSportType: jest.fn((sport) => `Normalized(${sport})`),
}));

const mockSession = (overrides: Partial<Session> = {}): Session => ({
    id: 1,
    documentId: 'doc1',
    start_datetime: new Date().toISOString(),
    name: 'Test Session',
    sport: 'running',
    expected_duration_minutes: 60,
    actual_duration_minutes: null,
    distance_km: 10,
    heartRate: null,
    heart_rate_avg: 150,
    coach_comment: 'Good job',
    status: 'completed',
    rpe: 8,
    type: 'training',
    ...overrides
} as Session);

describe('Session Utils', () => {
    describe('toSessionDisplay', () => {
        it('should map Session to SessionDisplay correctly', () => {
            const session = mockSession({
                start_datetime: '2024-01-01T10:00:00Z',
                expected_duration_minutes: 90
            });
            const result = toSessionDisplay(session);

            expect(result).toEqual({
                id: session.id,
                documentId: session.documentId,
                date: new Date(session.start_datetime),
                title: session.name,
                sportType: 'Normalized(running)',
                duration: 90,
                distance: 10,
                heartRate: 150,
                comment: 'Good job',
                status: 'completed',
                rpe: 8,
            });
        });

        it('should use actual_duration if expected is null', () => {
            const session = mockSession({ expected_duration_minutes: null, actual_duration_minutes: 45 });
            const result = toSessionDisplay(session);
            expect(result.duration).toBe(45);
        });
    });

    describe('getSessionsForDate', () => {
        it('should return sessions for specific date ignoring time', () => {
            const s1 = mockSession({ id: 1, start_datetime: '2024-01-01T08:00:00' });
            const s2 = mockSession({ id: 2, start_datetime: '2024-01-01T18:00:00' });
            const s3 = mockSession({ id: 3, start_datetime: '2024-01-02T08:00:00' });

            const target = new Date('2024-01-01T12:00:00');
            const result = getSessionsForDate([s1, s2, s3], target);

            expect(result).toHaveLength(2);
            expect(result.map(r => r.id)).toEqual([1, 2]);
        });
    });

    describe('getSessionForDate', () => {
        it('should return the first session found for date', () => {
            const s1 = mockSession({ id: 1, start_datetime: '2024-01-01T08:00:00' });
            const target = new Date('2024-01-01');
            const result = getSessionForDate([s1], target);
            expect(result?.id).toBe(1);
        });

        it('should return null if no session on date', () => {
            const s1 = mockSession({ id: 1, start_datetime: '2024-01-02' });
            const target = new Date('2024-01-01');
            const result = getSessionForDate([s1], target);
            expect(result).toBeNull();
        });
    });

    describe('hasSessionOnDate', () => {
        it('should return true if session exists on date', () => {
            const s1 = mockSession({ start_datetime: '2024-01-01T10:00:00' });
            expect(hasSessionOnDate([s1], new Date('2024-01-01'))).toBe(true);
        });

        it('should return false if no session on date', () => {
            const s1 = mockSession({ start_datetime: '2024-01-02T10:00:00' });
            expect(hasSessionOnDate([s1], new Date('2024-01-01'))).toBe(false);
        });
    });

    describe('getSessionsForWeek', () => {
        it('should return sessions within the week range (7 days from start)', () => {
            const startOfWeek = new Date('2024-01-01'); // Monday
            const s1 = mockSession({ id: 1, start_datetime: '2024-01-01T10:00:00' }); // Start day
            const s2 = mockSession({ id: 2, start_datetime: '2024-01-07T23:59:59' }); // End of week (within)
            const s3 = mockSession({ id: 3, start_datetime: '2024-01-08T00:00:01' }); // Next week

            const result = getSessionsForWeek([s1, s2, s3], startOfWeek);
            expect(result.map(r => r.id)).toEqual([1, 2]);
        });
    });
});

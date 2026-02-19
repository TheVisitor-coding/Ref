import {
    isToday,
    getStartOfToday,
    formatDate,
    formatDateToISO,
    isDateInRange,
    getWeekStart,
    getWeekEnd,
    formatTimeToHHMM,
    formatTimeForStrapi,
    getNextDay,
    formatWeekRange,
    formatDayDate,
    isSameDay,
    formatTimeDisplay,
} from '@/utils/date';

describe('Date Utils', () => {
    describe('isToday', () => {
        it('should return true for today', () => {
            const today = new Date().toISOString();
            expect(isToday(today)).toBe(true);
        });

        it('should return false for yesterday', () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            expect(isToday(yesterday.toISOString())).toBe(false);
        });

        it('should return false for null', () => {
            expect(isToday(null)).toBe(false);
        });

        it('should return false for invalid date string', () => {
            expect(isToday('invalid-date')).toBe(false);
        });
    });

    describe('getStartOfToday', () => {
        it('should return date with time 00:00:00.000', () => {
            const startOfDay = getStartOfToday();
            expect(startOfDay.getUTCHours()).toBe(0);
            expect(startOfDay.getUTCMinutes()).toBe(0);
            expect(startOfDay.getUTCSeconds()).toBe(0);
            expect(startOfDay.getUTCMilliseconds()).toBe(0);
        });
    });

    describe('formatDate', () => {
        it('should format date correctly in French', () => {
            const date = new Date('2024-01-01T12:00:00');
            // 1st Jan 2024 was a Monday
            expect(formatDate(date)).toBe('Lundi 1 Janvier');
        });
    });

    describe('formatDateToISO', () => {
        it('should format date to YYYY-MM-DD', () => {
            const date = new Date('2024-01-31T12:00:00');
            expect(formatDateToISO(date)).toBe('2024-01-31');
        });

        it('should use current date if none provided', () => {
            const now = new Date();
            const iso = formatDateToISO();
            const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            expect(iso).toBe(expected);
        });
    });

    describe('isDateInRange', () => {
        const start = new Date('2024-01-01');
        const end = new Date('2024-01-10');

        it('should return true if date is within range', () => {
            const date = new Date('2024-01-05');
            expect(isDateInRange(date, start, end)).toBe(true);
        });

        it('should return true if date is start date', () => {
            expect(isDateInRange(start, start, end)).toBe(true);
        });

        it('should return true if date is end date', () => {
            expect(isDateInRange(end, start, end)).toBe(true);
        });

        it('should return false if date is before range', () => {
            const date = new Date('2023-12-31');
            expect(isDateInRange(date, start, end)).toBe(false);
        });

        it('should return false if date is after range', () => {
            const date = new Date('2024-01-11');
            expect(isDateInRange(date, start, end)).toBe(false);
        });
    });

    describe('getWeekStart', () => {
        it('should return the Monday of the week', () => {
            // Jan 1 2024 was Monday
            const date = new Date('2024-01-03'); // Wednesday
            const start = getWeekStart(date);
            expect(start.toISOString().split('T')[0]).toBe('2024-01-01');
        });

        it('should handle Sunday correctly (return previous Monday)', () => {
            const date = new Date('2024-01-07'); // Sunday
            const start = getWeekStart(date);
            expect(start.toISOString().split('T')[0]).toBe('2024-01-01');
        });
    });

    describe('formatTimeToHHMM', () => {
        it('should format date time to HH:MM', () => {
            const date = new Date('2024-01-01T08:05:00');
            expect(formatTimeToHHMM(date)).toBe('08:05');
        });
    });

    describe('formatTimeForStrapi', () => {
        it('should append seconds and milliseconds', () => {
            expect(formatTimeForStrapi('10:30')).toBe('10:30:00.000');
        });
    });

    describe('getNextDay', () => {
        it('should return next day ISO string', () => {
            expect(getNextDay('2024-01-31')).toBe('2024-02-01');
        });
    });

    describe('formatWeekRange', () => {
        it('should format range within same month', () => {
            const date = new Date('2024-01-01');
            // "Du 1 → 7 janv. 2024" (approx depending on locale impl)
            const result = formatWeekRange(date);
            expect(result).toContain('Du 1');
            expect(result).toContain('7 janv');
            expect(result).toContain('2024');
        });

        it('should format range across months', () => {
            const date = new Date('2024-01-29'); // Monday
            // End is Feb 4
            const result = formatWeekRange(date);
            expect(result).toContain('Du 29 janv');
            expect(result).toContain('4 févr');
            expect(result).toContain('2024');
        });
    });

    describe('formatDayDate', () => {
        it('should format distinct day date', () => {
            const date = new Date('2024-01-01');
            const result = formatDayDate(date);
            expect(result).toMatch(/1 janv/);
            expect(result).toContain('2024');
        });
    });

    describe('isSameDay', () => {
        it('should return true for same day', () => {
            const d1 = new Date('2024-01-01T10:00:00');
            const d2 = new Date('2024-01-01T20:00:00');
            expect(isSameDay(d1, d2)).toBe(true);
        });

        it('should return false for different days', () => {
            const d1 = new Date('2024-01-01');
            const d2 = new Date('2024-01-02');
            expect(isSameDay(d1, d2)).toBe(false);
        });
    });

    describe('getWeekEnd', () => {
        it('should return the date 6 days after start', () => {
            const start = new Date('2024-01-01');
            const end = getWeekEnd(start);
            expect(end.toISOString().split('T')[0]).toBe('2024-01-07');
        });
    });

    describe('formatTimeDisplay', () => {
        it('should format full strapi time to display', () => {
            expect(formatTimeDisplay('08:00:00.000')).toBe('8h00');
        });
        it('should format short time to display', () => {
            expect(formatTimeDisplay('14:30')).toBe('14h30');
        });
    });
});

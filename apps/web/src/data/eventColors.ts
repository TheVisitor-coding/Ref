import type { EventColor } from '@/types/CoachEvent';

export interface EventColorStyle {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
}

export const eventColorMap: Record<EventColor, EventColorStyle> = {
    red: { backgroundColor: '#FEE2E2', borderColor: '#EF4444', textColor: '#B91C1C' },
    orange: { backgroundColor: '#FFEDD5', borderColor: '#F97316', textColor: '#C2410C' },
    yellow: { backgroundColor: '#FEF9C3', borderColor: '#EAB308', textColor: '#A16207' },
    green: { backgroundColor: '#DCFCE7', borderColor: '#22C55E', textColor: '#15803D' },
    blue: { backgroundColor: '#DBEAFE', borderColor: '#3B82F6', textColor: '#1D4ED8' },
    purple: { backgroundColor: '#F3E8FF', borderColor: '#A855F7', textColor: '#7E22CE' },
    gray: { backgroundColor: '#F3F4F6', borderColor: '#6B7280', textColor: '#374151' },
};

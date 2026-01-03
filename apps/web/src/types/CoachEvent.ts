export type EventType = 'meeting' | 'absence' | 'personal' | 'reminder' | 'other';

export type EventColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';

export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface EventParticipant {
    id: number;
    name: string;
    avatar?: string;
}

export interface RecurrenceRule {
    type: RecurrenceType;
    interval?: number; // Every X days/weeks/months
    endDate?: string;
    count?: number;
}

export interface CoachEvent {
    id: number;
    documentId: string;

    coach: { id: number } | number;

    title: string;
    description: string | null;

    start_datetime: string;
    end_datetime: string | null;
    is_all_day: boolean;

    location: string | null;
    event_type: EventType;
    color: EventColor;

    participants: EventParticipant[] | null;

    is_recurring: boolean;
    recurrence_rule: RecurrenceRule | null;

    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
}

export interface CoachEventDisplay {
    id: number;
    documentId: string;
    title: string;
    start: Date;
    end: Date | null;
    isAllDay: boolean;
    eventType: EventType;
    color: EventColor;
    location: string | null;
}

export const eventColorConfig: Record<EventColor, { bgColor: string; borderColor: string; textColor: string }> = {
    red: {
        bgColor: 'bg-red-100',
        borderColor: 'border-red-500',
        textColor: 'text-red-700',
    },
    orange: {
        bgColor: 'bg-orange-100',
        borderColor: 'border-orange-500',
        textColor: 'text-orange-700',
    },
    yellow: {
        bgColor: 'bg-yellow-100',
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-700',
    },
    green: {
        bgColor: 'bg-green-100',
        borderColor: 'border-green-500',
        textColor: 'text-green-700',
    },
    blue: {
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-700',
    },
    purple: {
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-500',
        textColor: 'text-purple-700',
    },
    gray: {
        bgColor: 'bg-gray-100',
        borderColor: 'border-gray-500',
        textColor: 'text-gray-700',
    },
};

export const eventTypeConfig: Record<EventType, { label: string; icon: string }> = {
    meeting: { label: 'Réunion', icon: 'users' },
    absence: { label: 'Absence', icon: 'calendar-off' },
    personal: { label: 'Personnel', icon: 'user' },
    reminder: { label: 'Rappel', icon: 'bell' },
    other: { label: 'Autre', icon: 'circle' },
};

export const eventTypeOptions = Object.entries(eventTypeConfig).map(([value, config]) => ({
    value,
    label: config.label,
}));

export const eventColorOptions: { value: EventColor; label: string; colorClass: string }[] = [
    { value: 'red', label: 'Rouge', colorClass: 'bg-red-500' },
    { value: 'orange', label: 'Orange', colorClass: 'bg-orange-500' },
    { value: 'yellow', label: 'Jaune', colorClass: 'bg-yellow-500' },
    { value: 'green', label: 'Vert', colorClass: 'bg-green-500' },
    { value: 'blue', label: 'Bleu', colorClass: 'bg-blue-500' },
    { value: 'purple', label: 'Violet', colorClass: 'bg-purple-500' },
    { value: 'gray', label: 'Gris', colorClass: 'bg-gray-500' },
];

export const recurrenceOptions: { value: RecurrenceType; label: string }[] = [
    { value: 'none', label: 'Jamais' },
    { value: 'daily', label: 'Tous les jours' },
    { value: 'weekly', label: 'Toutes les semaines' },
    { value: 'monthly', label: 'Tous les mois' },
    { value: 'yearly', label: 'Tous les ans' },
];

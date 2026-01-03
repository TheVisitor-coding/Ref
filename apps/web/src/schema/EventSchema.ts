import z from "zod";
import type { EventColor, EventType, RecurrenceType } from "@/types/CoachEvent";

export const EventFormSchema = z.object({
    documentId: z.string().optional(),
    title: z.string().min(1, "Le nom de l'événement est requis").max(255),
    date: z.string().min(1, "La date est requise"),
    startTime: z.string().default('10:00'),
    endTime: z.string().default('11:00'),
    isAllDay: z.boolean().default(false),

    location: z.string().max(500).default(''),
    eventType: z.enum(['meeting', 'absence', 'personal', 'reminder', 'other'] as const).default('meeting'),
    color: z.enum(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'] as const).default('blue'),

    recurrence: z.enum(['none', 'daily', 'weekly', 'monthly', 'yearly'] as const).default('none'),

    participants: z.array(z.object({
        id: z.number(),
        name: z.string(),
        avatar: z.string().optional(),
    })).default([]),

    description: z.string().max(2000).default(''),
});

export const EventPayloadSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().nullable(),

    start_datetime: z.string(),
    end_datetime: z.string().nullable(),
    is_all_day: z.boolean(),

    location: z.string().nullable(),
    event_type: z.enum(['meeting', 'absence', 'personal', 'reminder', 'other'] as const),
    color: z.enum(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'] as const),

    participants: z.array(z.object({
        id: z.number(),
        name: z.string(),
        avatar: z.string().optional(),
    })).nullable(),

    is_recurring: z.boolean(),
    recurrence_rule: z.object({
        type: z.enum(['none', 'daily', 'weekly', 'monthly', 'yearly'] as const),
        interval: z.number().optional(),
        endDate: z.string().optional(),
        count: z.number().optional(),
    }).nullable(),
});

export type EventFormInput = z.input<typeof EventFormSchema>;
export type EventForm = z.infer<typeof EventFormSchema>;
export type EventPayload = z.infer<typeof EventPayloadSchema>;

export function transformEventFormToPayload(form: EventForm): EventPayload {
    const buildDatetime = (date: string, time: string): string => {
        const [year, month, day] = date.split('-').map(Number);
        const [hours, minutes] = time.split(':').map(Number);
        const dateObj = new Date(year, month - 1, day, hours, minutes);
        return dateObj.toISOString();
    };

    const startDatetime = form.isAllDay
        ? new Date(`${form.date}T00:00:00`).toISOString()
        : buildDatetime(form.date, form.startTime);

    const endDatetime = form.isAllDay
        ? new Date(`${form.date}T23:59:59`).toISOString()
        : buildDatetime(form.date, form.endTime);

    const recurrenceRule = form.recurrence !== 'none'
        ? { type: form.recurrence }
        : null;

    return {
        title: form.title,
        description: form.description || null,
        start_datetime: startDatetime,
        end_datetime: endDatetime,
        is_all_day: form.isAllDay,
        location: form.location || null,
        event_type: form.eventType as EventType,
        color: form.color as EventColor,
        participants: form.participants.length > 0 ? form.participants : null,
        is_recurring: form.recurrence !== 'none',
        recurrence_rule: recurrenceRule as EventPayload['recurrence_rule'],
    };
}

export const formatDateForInput = (date?: Date): string => {
    if (!date) return new Date().toISOString().split('T')[0];
    return date.toISOString().split('T')[0];
};

export const formatTimeForInput = (date?: Date): string => {
    if (!date) return '10:00';
    return date.toTimeString().slice(0, 5);
};

export const getEventDefaultValues = (
    initialData?: Partial<EventFormInput>,
    selectedDate?: Date
): EventFormInput => ({
    documentId: initialData?.documentId,
    title: initialData?.title ?? '',
    date: initialData?.date ?? formatDateForInput(selectedDate),
    startTime: initialData?.startTime ?? '10:00',
    endTime: initialData?.endTime ?? '11:00',
    isAllDay: initialData?.isAllDay ?? false,
    location: initialData?.location ?? '',
    eventType: initialData?.eventType ?? 'meeting',
    color: initialData?.color ?? 'blue',
    recurrence: initialData?.recurrence ?? 'none',
    participants: initialData?.participants ?? [],
    description: initialData?.description ?? '',
});

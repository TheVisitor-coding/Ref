import z from "zod";
import { formatDateToISO, formatTimeForStrapi } from "@/utils/date";

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
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    isAllDay: z.boolean(),
    location: z.string().nullable(),
    eventType: z.enum(['meeting', 'absence', 'personal', 'reminder', 'other'] as const),
    color: z.enum(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'] as const),
    is_recurring: z.boolean(),
    recurrence: z.object({
        type: z.enum(['none', 'daily', 'weekly', 'monthly', 'yearly'] as const),
        interval: z.number().optional(),
        endDate: z.string().optional(),
        count: z.number().optional(),
    }).nullable(),
});

export const PatchEventSchema = z.object({
    documentId: z.string().min(1, 'documentId is required'),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    date: z.string().optional(),
});

export type EventFormInput = z.input<typeof EventFormSchema>;
export type EventForm = z.infer<typeof EventFormSchema>;
export type EventPayload = z.infer<typeof EventPayloadSchema>;

export function transformEventFormToPayload(form: EventForm): EventPayload {
    const recurrenceData = form.recurrence === 'none'
        ? null
        : { type: form.recurrence };

    return {
        title: form.title,
        description: form.description || null,
        date: form.date,
        startTime: formatTimeForStrapi(form.startTime),
        endTime: formatTimeForStrapi(form.endTime),
        isAllDay: form.isAllDay,
        location: form.location || null,
        eventType: form.eventType,
        color: form.color,
        is_recurring: form.recurrence !== 'none',
        recurrence: recurrenceData as EventPayload['recurrence'],
    };
}

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
    date: initialData?.date ?? formatDateToISO(selectedDate),
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

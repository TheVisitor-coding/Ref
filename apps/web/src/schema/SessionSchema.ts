import z from "zod";

export const SessionFormSchema = z.object({
    title: z.string().min(1, "Le nom de la séance est requis").max(255),
    date: z.string().min(1, "La date est requise"), // Format ISO string depuis le form

    sport: z.string().max(100).default(''),
    tags: z.string().default(''), // String séparée par virgules depuis le form
    presenceRequired: z.boolean().default(false),

    duration: z.string().default(''),
    rpe: z.number().min(1).max(10).optional(),
    distance: z.string().default(''),
    heartRate: z.string().default(''),
    speed: z.string().default(''),
    power: z.string().default(''),

    sessionBody: z.string().max(5000).default(''),
    comment: z.string().max(1000).default(''),
});

export const SessionPayloadSchema = z.object({
    name: z.string().min(1).max(255),
    sport: z.string().max(100).nullable(),
    tags: z.array(z.string()).nullable(),
    start_datetime: z.string(), // ISO datetime
    end_datetime: z.string().nullable(),
    requires_presence: z.boolean(),
    session_body: z.string().nullable(),
    coach_comment: z.string().nullable(),
    expected_duration_minutes: z.number().nullable(),
    rpe: z.number().min(1).max(10).nullable(),
    distance_km: z.number().nullable(),
    heart_rate_avg: z.number().nullable(),
    speed_kmh: z.number().nullable(),
    power_watts: z.number().nullable(),
    status: z.enum(['draft', 'scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'conflict_pending']).default('draft'),
});

export type SessionFormInput = z.input<typeof SessionFormSchema>;
export type SessionForm = z.infer<typeof SessionFormSchema>;
export type SessionPayload = z.infer<typeof SessionPayloadSchema>;

export function transformFormToPayload(form: SessionForm): SessionPayload {
    const parseDuration = (duration: string): number | null => {
        if (!duration) return null;
        const timeMatch = duration.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
        if (timeMatch) {
            const hours = parseInt(timeMatch[1], 10);
            const minutes = parseInt(timeMatch[2], 10);
            return hours * 60 + minutes;
        }
        const num = parseFloat(duration);
        return isNaN(num) ? null : num;
    };

    const parseNumber = (value: string): number | null => {
        if (!value) return null;
        const num = parseFloat(value);
        return isNaN(num) ? null : num;
    };

    const parseTags = (tags: string): string[] | null => {
        if (!tags) return null;
        const arr = tags.split(',').map(t => t.trim()).filter(Boolean);
        return arr.length > 0 ? arr : null;
    };

    const calculateEndDatetime = (startDatetime: string, durationMinutes: number | null): string | null => {
        if (!durationMinutes) return null;
        const start = new Date(startDatetime);
        start.setMinutes(start.getMinutes() + durationMinutes);
        return start.toISOString();
    };

    const durationMinutes = parseDuration(form.duration);

    return {
        name: form.title,
        sport: form.sport || null,
        tags: parseTags(form.tags),
        start_datetime: new Date(form.date).toISOString(),
        end_datetime: calculateEndDatetime(form.date, durationMinutes),
        requires_presence: form.presenceRequired ?? false,
        session_body: form.sessionBody || null,
        coach_comment: form.comment || null,
        expected_duration_minutes: durationMinutes,
        rpe: form.rpe ?? null,
        distance_km: parseNumber(form.distance),
        heart_rate_avg: parseNumber(form.heartRate) ? Math.round(parseNumber(form.heartRate)!) : null,
        speed_kmh: parseNumber(form.speed),
        power_watts: parseNumber(form.power) ? Math.round(parseNumber(form.power)!) : null,
        status: 'draft',
    };
}
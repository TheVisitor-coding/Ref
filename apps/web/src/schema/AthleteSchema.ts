import { z } from 'zod';

export const athleteUpdateSchema = z.object({
    first_name: z.string().min(1).max(50),
    last_name: z.string().min(1).max(100),
    email: z.email(),
    phone: z.string().max(20).optional(),
    height: z.coerce.number().min(1).max(999).optional().or(z.literal('')).transform(v => v === '' ? undefined : v),
    weight: z.coerce.number().min(1).max(999).optional().or(z.literal('')).transform(v => v === '' ? undefined : v),

    birth_date: z.string().optional().transform(v => v || undefined)
        .refine(v => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), 'Format attendu: YYYY-MM-DD'),
    tag: z.string().max(50).optional(),

    level: z.enum(['beginner', 'intermediate', 'expert', 'professional']).optional(),
    discipline: z.string().max(50).optional().transform(v => v || undefined),

    mainObjective: z.string().max(120).optional().transform(v => v || undefined),
    secondaryObjective: z.string().max(120).optional().transform(v => v || undefined),
    relation_notes: z.string().optional().transform(v => v || undefined),
});

export type AthleteUpdateForm = z.input<typeof athleteUpdateSchema>;
export type AthleteUpdatePayload = z.output<typeof athleteUpdateSchema>;

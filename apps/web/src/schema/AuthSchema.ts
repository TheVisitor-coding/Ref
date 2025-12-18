import z from 'zod';

export const onboardingDataSchema = z.object({
    firstName: z.string().min(1, 'Le prénom est requis').max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
    selectedSports: z.array(z.string()).min(1, 'Sélectionnez au moins un sport'),
    athletesCount: z.enum(['less-than-5', '5-to-20', '20-to-50', 'more-than-50'], {
        message: 'Sélectionnez le nombre de sportifs',
    }),
    selectedFeatures: z.array(z.enum([
        'athletes-tracking',
        'session-analysis',
        'calendar',
        'messaging',
        'payments',
        'tasks',
    ])),
});

export type OnboardingDataSchemaType = z.infer<typeof onboardingDataSchema>;

export const signupFormSchema = z.object({
    email: z
        .string()
        .min(1, "L'email est requis")
        .email('Adresse e-mail invalide'),
    password: z
        .string()
        .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
        .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
        .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
        .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
});

export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;

export const signupSchema = signupFormSchema.extend({
    onboardingData: onboardingDataSchema,
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    identifier: z
        .string()
        .min(1, "L'email ou le nom d'utilisateur est requis")
        .min(3, "L'identifiant doit contenir au moins 3 caractères"),
    password: z.string().min(1, 'Le mot de passe est requis'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
import z from 'zod';
import { FEATURE_IDS } from '@/data/featuresList';
import { FIRSTNAME_REGEX, FIRSTNAME_ERROR_MESSAGE, FIRSTNAME_MAX_LENGTH } from '@/utils/validation';

export const onboardingDataSchema = z.object({
    firstName: z
        .string()
        .min(1, 'Le prénom est requis')
        .max(FIRSTNAME_MAX_LENGTH, `Le prénom ne peut pas dépasser ${FIRSTNAME_MAX_LENGTH} caractères`)
        .regex(FIRSTNAME_REGEX, FIRSTNAME_ERROR_MESSAGE),
    selectedSports: z.array(z.string()).min(1, 'Sélectionnez au moins un sport'),
    athletesCount: z
        .number()
        .min(1, 'Le nombre de sportifs doit être au moins 1')
        .max(40, 'Le nombre de sportifs ne peut pas dépasser 40'),
    selectedFeatures: z.array(z.enum(FEATURE_IDS)),
});

export type OnboardingDataSchemaType = z.infer<typeof onboardingDataSchema>;

export const signupFormSchema = z.object({
    email: z
        .email('Adresse e-mail invalide')
        .min(1, "L'email est requis"),
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
        .min(1, "L'email est requis")
        .min(3, "L'identifiant doit contenir au moins 3 caractères"),
    password: z.string().min(1, 'Le mot de passe est requis'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
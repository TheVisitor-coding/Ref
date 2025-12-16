import z from 'zod';

export const signupSchema = z.object({
    username: z
        .string()
        .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
        .max(50, "Le nom d'utilisateur ne peut pas dépasser 50 caractères")
        .regex(/^[a-zA-Z0-9_-]+$/, "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores"),
    email: z.email('Adresse e-mail invalide').min(1, "L'email est requis"),
    password: z
        .string()
        .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
        .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
        .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
        .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
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
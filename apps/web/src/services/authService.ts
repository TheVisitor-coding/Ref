import { AuthResponseType, SignupRequestType } from "@/types/Auth";

type StrapiErrorPayload = {
    error?: {
        message?: string;
        name?: string;
        details?: unknown;
    };
};

export class AuthError extends Error {
    constructor(
        message: string,
        public code: string,
        public status: number,
        public details?: unknown
    ) {
        super(message)
        this.name = 'AuthError'
    }
}

/**
 * Service Register
 */
export const signupUser = async (userData: SignupRequestType): Promise<AuthResponseType> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/register-coach`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData: StrapiErrorPayload = await response.json().catch(() => ({} as StrapiErrorPayload))
        throw new AuthError(
            errorData.error?.message || "Erreur lors de l'inscription",
            errorData.error?.name || 'UNKNOWN_ERROR',
            response.status,
            errorData.error?.details
        )
    }
    return response.json();
};

/**
 * Service Login
 */
export const loginUser = async (credentials: { identifier: string; password: string }): Promise<AuthResponseType> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData: StrapiErrorPayload = await response.json().catch(() => ({} as StrapiErrorPayload))
        throw new AuthError(
            errorData.error?.message || "Erreur lors de la connexion",
            errorData.error?.name || 'UNKNOWN_ERROR',
            response.status,
            errorData.error?.details
        )
    }

    return response.json();
}
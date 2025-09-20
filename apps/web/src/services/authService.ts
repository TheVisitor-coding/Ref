import { AuthResponseType, SignupRequestType } from "@/types/Auth";

export class AuthError extends Error {
    constructor(
        message: string, 
        public code: string,
        public status: number,
        public details?: any
    ) {
        super(message)
        this.name = 'AuthError'
    }
}

/**
 * Service Register
 */
export const signupUser = async (userData: SignupRequestType): Promise<AuthResponseType> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-coach`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new AuthError(
            errorData.error?.message || "Erreur lors de la connexion",
            errorData.error?.name || 'UNKNOWN_ERROR',
            response.status,
            errorData.error?.details
        )
    }

    return response.json();
}
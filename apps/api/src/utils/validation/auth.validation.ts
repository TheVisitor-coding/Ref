export interface RegisterCoachInput {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
}

export interface LoginInput {
    identifier: string;
    password: string;
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
}

export interface ValidationError {
    field: string;
    message: string;
    code: string;
}

const PASSWORD_RULES = {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const USERNAME_RULES = {
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_-]+$/,
};

export function validateEmail(email: string): ValidationError | null {
    if (!email || typeof email !== 'string') {
        return { field: 'email', message: 'Email is required', code: 'REQUIRED' };
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail.length < 6) {
        return { field: 'email', message: 'Email must be at least 6 characters', code: 'TOO_SHORT' };
    }

    if (trimmedEmail.length > 254) {
        return { field: 'email', message: 'Email must not exceed 254 characters', code: 'TOO_LONG' };
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
        return { field: 'email', message: 'Invalid email format', code: 'INVALID_FORMAT' };
    }

    return null;
}

export function validateUsername(username: string): ValidationError | null {
    if (!username || typeof username !== 'string') {
        return { field: 'username', message: 'Username is required', code: 'REQUIRED' };
    }

    const trimmedUsername = username.trim();

    if (trimmedUsername.length < USERNAME_RULES.minLength) {
        return {
            field: 'username',
            message: `Username must be at least ${USERNAME_RULES.minLength} characters`,
            code: 'TOO_SHORT',
        };
    }

    if (trimmedUsername.length > USERNAME_RULES.maxLength) {
        return {
            field: 'username',
            message: `Username must not exceed ${USERNAME_RULES.maxLength} characters`,
            code: 'TOO_LONG',
        };
    }

    if (!USERNAME_RULES.pattern.test(trimmedUsername)) {
        return {
            field: 'username',
            message: 'Username can only contain letters, numbers, underscores and hyphens',
            code: 'INVALID_FORMAT',
        };
    }

    return null;
}

export function validatePassword(password: string): ValidationError | null {
    if (!password || typeof password !== 'string') {
        return { field: 'password', message: 'Password is required', code: 'REQUIRED' };
    }

    if (password.length < PASSWORD_RULES.minLength) {
        return {
            field: 'password',
            message: `Password must be at least ${PASSWORD_RULES.minLength} characters`,
            code: 'TOO_SHORT',
        };
    }

    if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
        return {
            field: 'password',
            message: 'Password must contain at least one uppercase letter',
            code: 'MISSING_UPPERCASE',
        };
    }

    if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(password)) {
        return {
            field: 'password',
            message: 'Password must contain at least one lowercase letter',
            code: 'MISSING_LOWERCASE',
        };
    }

    if (PASSWORD_RULES.requireNumber && !/[0-9]/.test(password)) {
        return {
            field: 'password',
            message: 'Password must contain at least one number',
            code: 'MISSING_NUMBER',
        };
    }

    if (PASSWORD_RULES.requireSpecial && !/[^A-Za-z0-9]/.test(password)) {
        return {
            field: 'password',
            message: 'Password must contain at least one special character',
            code: 'MISSING_SPECIAL',
        };
    }

    return null;
}

export function validateIdentifier(identifier: string): ValidationError | null {
    if (!identifier || typeof identifier !== 'string') {
        return { field: 'identifier', message: 'Email or username is required', code: 'REQUIRED' };
    }

    const trimmed = identifier.trim();

    if (trimmed.length < 3) {
        return {
            field: 'identifier',
            message: 'Identifier must be at least 3 characters',
            code: 'TOO_SHORT',
        };
    }

    return null;
}

export function validateRegisterInput(input: unknown): ValidationResult {
    const errors: ValidationError[] = [];

    if (!input || typeof input !== 'object') {
        return {
            valid: false,
            errors: [{ field: 'body', message: 'Request body is required', code: 'REQUIRED' }],
        };
    }

    const data = input as Record<string, unknown>;

    // Validate required fields
    const usernameError = validateUsername(data.username as string);
    if (usernameError) errors.push(usernameError);

    const emailError = validateEmail(data.email as string);
    if (emailError) errors.push(emailError);

    const passwordError = validatePassword(data.password as string);
    if (passwordError) errors.push(passwordError);

    return {
        valid: errors.length === 0,
        errors,
    };
}

export function validateLoginInput(input: unknown): ValidationResult {
    const errors: ValidationError[] = [];

    if (!input || typeof input !== 'object') {
        return {
            valid: false,
            errors: [{ field: 'body', message: 'Request body is required', code: 'REQUIRED' }],
        };
    }

    const data = input as Record<string, unknown>;

    const identifierError = validateIdentifier(data.identifier as string);
    if (identifierError) errors.push(identifierError);

    // For login, we only check password is present, not its strength
    if (!data.password || typeof data.password !== 'string') {
        errors.push({ field: 'password', message: 'Password is required', code: 'REQUIRED' });
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

export function sanitizeRegisterInput(input: RegisterCoachInput): RegisterCoachInput {
    return {
        username: input.username?.trim(),
        email: input.email?.trim().toLowerCase(),
        password: input.password,
        first_name: input.first_name?.trim(),
        last_name: input.last_name?.trim(),
    };
}

export function sanitizeLoginInput(input: LoginInput): LoginInput {
    return {
        identifier: input.identifier?.trim().toLowerCase(),
        password: input.password,
    };
}

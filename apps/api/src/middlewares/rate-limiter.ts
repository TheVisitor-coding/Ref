import type { Core } from '@strapi/strapi';

interface RateLimitConfig {
    /** Time window in milliseconds */
    windowMs: number;
    /** Maximum requests per window */
    max: number;
    /** Message returned when rate limited */
    message?: string;
    /** Key generator function - defaults to IP */
    keyGenerator?: (ctx: any) => string;
    /** Skip function - return true to bypass rate limit */
    skip?: (ctx: any) => boolean;
}

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 5 * 60 * 1000;

setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (entry.resetTime < now) {
            rateLimitStore.delete(key);
        }
    }
}, CLEANUP_INTERVAL);

export const AUTH_RATE_LIMIT_CONFIG: RateLimitConfig = {
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many authentication attempts. Please try again later.',
};

export const REGISTER_RATE_LIMIT_CONFIG: RateLimitConfig = {
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: 'Too many registration attempts. Please try again later.',
};

export const EMAIL_CONFIRMATION_RATE_LIMIT_CONFIG: RateLimitConfig = {
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: 'Too many confirmation attempts. Please try again later.',
};

export const RESEND_CONFIRMATION_RATE_LIMIT_CONFIG: RateLimitConfig = {
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: 'Too many email resend attempts. Please try again in an hour.',
};

export function createRateLimiter(config: RateLimitConfig) {
    const {
        windowMs,
        max,
        message = 'Too many requests. Please try again later.',
        keyGenerator = (ctx) => getClientIP(ctx),
        skip = () => false,
    } = config;

    return async (ctx: any, next: () => Promise<void>) => {
        // Check if should skip rate limiting
        if (skip(ctx)) {
            return next();
        }

        const key = keyGenerator(ctx);
        const now = Date.now();

        let entry = rateLimitStore.get(key);

        if (!entry || entry.resetTime < now) {
            entry = {
                count: 0,
                resetTime: now + windowMs,
            };
        }

        entry.count++;
        rateLimitStore.set(key, entry);

        const remaining = Math.max(0, max - entry.count);
        const resetSeconds = Math.ceil((entry.resetTime - now) / 1000);

        ctx.set('X-RateLimit-Limit', String(max));
        ctx.set('X-RateLimit-Remaining', String(remaining));
        ctx.set('X-RateLimit-Reset', String(resetSeconds));

        if (entry.count > max) {
            ctx.set('Retry-After', String(resetSeconds));
            ctx.status = 429;
            ctx.body = {
                error: {
                    status: 429,
                    name: 'TooManyRequestsError',
                    message,
                    details: {
                        retryAfter: resetSeconds,
                    },
                },
            };
            return;
        }

        await next();
    };
}

function getClientIP(ctx: any): string {
    const forwarded = ctx.request.headers['x-forwarded-for'];
    if (forwarded) {
        const ips = forwarded.split(',').map((ip: string) => ip.trim());
        return ips[0];
    }

    const realIP = ctx.request.headers['x-real-ip'];
    if (realIP) {
        return realIP;
    }

    return ctx.request.ip || ctx.request.socket?.remoteAddress || 'unknown';
}

export function createLoginRateLimiter() {
    return createRateLimiter({
        ...AUTH_RATE_LIMIT_CONFIG,
        keyGenerator: (ctx) => {
            const ip = getClientIP(ctx);
            const identifier = ctx.request.body?.identifier || '';
            // Rate limit both by IP and by identifier
            return `login:${ip}:${identifier.toLowerCase()}`;
        },
    });
}

export function createRegisterRateLimiter() {
    return createRateLimiter({
        ...REGISTER_RATE_LIMIT_CONFIG,
        keyGenerator: (ctx) => {
            const ip = getClientIP(ctx);
            return `register:${ip}`;
        },
    });
}

export function createEmailConfirmationRateLimiter() {
    return createRateLimiter({
        ...EMAIL_CONFIRMATION_RATE_LIMIT_CONFIG,
        keyGenerator: (ctx) => {
            const ip = getClientIP(ctx);
            return `email-confirm:${ip}`;
        },
    });
}

export function createResendConfirmationRateLimiter() {
    return createRateLimiter({
        ...RESEND_CONFIRMATION_RATE_LIMIT_CONFIG,
        keyGenerator: (ctx) => {
            const ip = getClientIP(ctx);
            const email = ctx.request.body?.email || '';
            return `resend-confirm:${ip}:${email.toLowerCase()}`;
        },
    });
}

export default {
    createRateLimiter,
    createLoginRateLimiter,
    createRegisterRateLimiter,
    createEmailConfirmationRateLimiter,
    createResendConfirmationRateLimiter,
    AUTH_RATE_LIMIT_CONFIG,
    REGISTER_RATE_LIMIT_CONFIG,
    EMAIL_CONFIRMATION_RATE_LIMIT_CONFIG,
    RESEND_CONFIRMATION_RATE_LIMIT_CONFIG,
};

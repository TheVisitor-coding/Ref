import { createResendConfirmationRateLimiter } from '../../../middlewares/rate-limiter';

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/auth/resend-confirmation',
            handler: 'email-confirmation.resend',
            config: {
                auth: false,
                prefix: '',
                middlewares: [createResendConfirmationRateLimiter()],
            },
        },
    ],
};

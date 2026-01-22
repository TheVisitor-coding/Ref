import { createEmailConfirmationRateLimiter } from '../../../middlewares/rate-limiter';

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/auth/email-confirmation',
            handler: 'email-confirmation.confirm',
            config: {
                auth: false,
                prefix: '',
                middlewares: [createEmailConfirmationRateLimiter()],
            },
        },
    ],
};

import type { Core } from '@strapi/strapi';
import { validateEmail } from '../../../utils/validation';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    /**
     * Confirm email with token
     * GET /api/auth/email-confirmation
     */
    async confirm(ctx) {
        try {
            const { confirmation } = ctx.query;

            if (!confirmation || typeof confirmation !== 'string' || confirmation.trim().length === 0) {
                return ctx.badRequest('Invalid confirmation token');
            }

            const emailService = strapi.service('api::auth.email-confirmation');
            const result = await emailService.confirmEmail(confirmation);

            if (!result.success) {
                return ctx.badRequest(result.error);
            }

            ctx.send({
                jwt: result.jwt,
                user: result.user,
            });
        } catch (error) {
            strapi.log.error('Email confirmation error:', error);
            ctx.internalServerError('An error occurred during email confirmation');
        }
    },

    /**
     * Resend confirmation email
     * POST /api/auth/resend-confirmation
     */
    async resend(ctx) {
        try {
            const { email } = ctx.request.body;

            if (!email || !validateEmail(email)) {
                return ctx.badRequest('Invalid email address');
            }

            const emailService = strapi.service('api::auth.email-confirmation');
            const result = await emailService.resendConfirmationEmail(email);

            if (!result.success && result.error) {
                return ctx.badRequest(result.error);
            }

            ctx.send({
                message: result.message,
            });
        } catch (error) {
            strapi.log.error('Resend confirmation error:', error);
            ctx.internalServerError('An error occurred while resending confirmation email');
        }
    },
});

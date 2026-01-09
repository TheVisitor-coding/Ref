import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
    /**
     * Send confirmation email to user
     */
    async sendConfirmationEmail(user: any) {
        try {
            if (!user.confirmationToken) {
                throw new Error('User confirmation token is missing');
            }

            const confirmationUrl = process.env.EMAIL_CONFIRMATION_URL || 'http://localhost:3000/auth/email-confirmation';
            const confirmationLink = `${confirmationUrl}?confirmation=${user.confirmationToken}`;

            // Send email using Strapi's email plugin
            await strapi.plugin('email').service('email').send({
                to: user.email,
                from: process.env.SMTP_DEFAULT_FROM || 'no-reply@ref.local',
                replyTo: process.env.SMTP_DEFAULT_REPLY_TO || 'support@ref.local',
                subject: 'Confirmez votre adresse email',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h2 style="color: #2563eb;">Bienvenue sur Ref !</h2>
                            <p>Merci de vous être inscrit.</p>
                            <p>Pour activer votre compte, veuillez confirmer votre adresse email en cliquant sur le lien ci-dessous :</p>
                            <div style="margin: 30px 0;">
                                <a href="${confirmationLink}" 
                                   style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                                    Confirmer mon email
                                </a>
                            </div>
                            <p style="color: #666; font-size: 14px;">
                                Ou copiez ce lien dans votre navigateur :<br>
                                <a href="${confirmationLink}" style="color: #2563eb;">${confirmationLink}</a>
                            </p>
                            <p style="color: #666; font-size: 14px; margin-top: 30px;">
                                Si vous n'avez pas créé de compte, ignorez cet email.
                            </p>
                        </div>
                    </body>
                    </html>
                `,
                text: `Bienvenue sur Ref !\n\nMerci de vous être inscrit.\n\nPour activer votre compte, veuillez confirmer votre adresse email en cliquant sur le lien ci-dessous :\n\n${confirmationLink}\n\nSi vous n'avez pas créé de compte, ignorez cet email.`,
            });

            strapi.log.info(`Confirmation email sent to ${user.email}`);
            return { success: true };
        } catch (error) {
            strapi.log.error('Failed to send confirmation email:', error);
            throw error;
        }
    },

    /**
     * Confirm user email with token
     */
    async confirmEmail(confirmationToken: string) {
        try {
            const user = await strapi.query('plugin::users-permissions.user').findOne({
                where: { confirmationToken },
            });

            if (!user) {
                return {
                    success: false,
                    error: 'Invalid or expired confirmation token',
                };
            }

            if (user.confirmed) {
                return {
                    success: false,
                    error: 'Email already confirmed',
                };
            }

            // Update user
            const updatedUser = await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    confirmed: true,
                    confirmationToken: null,
                },
            });

            // Generate JWT
            const jwt = strapi
                .plugin('users-permissions')
                .service('jwt')
                .issue({
                    id: updatedUser.id,
                });

            strapi.log.info(`Email confirmed for user ${updatedUser.email}`);

            return {
                success: true,
                jwt,
                user: {
                    id: updatedUser.id,
                    username: updatedUser.username,
                    email: updatedUser.email,
                },
            };
        } catch (error) {
            strapi.log.error('Failed to confirm email:', error);
            throw error;
        }
    },

    /**
     * Resend confirmation email
     */
    async resendConfirmationEmail(email: string) {
        try {
            const user = await strapi.query('plugin::users-permissions.user').findOne({
                where: { email: email.toLowerCase() },
            });

            if (!user) {
                // Don't reveal if user exists
                return {
                    success: true,
                    message: 'If your email exists in our system, you will receive a confirmation email',
                };
            }

            if (user.confirmed) {
                return {
                    success: false,
                    error: 'Email already confirmed',
                };
            }

            // Send confirmation email
            await this.sendConfirmationEmail(user);

            return {
                success: true,
                message: 'Confirmation email sent',
            };
        } catch (error) {
            strapi.log.error('Failed to resend confirmation email:', error);
            throw error;
        }
    },
});

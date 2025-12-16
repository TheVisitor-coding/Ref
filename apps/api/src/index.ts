import type { Core } from '@strapi/strapi';
import bcrypt from 'bcryptjs';
import {
  validateRegisterInput,
  sanitizeRegisterInput,
  type ValidationResult,
} from './utils/validation';
import { createRegisterRateLimiter } from './middlewares/rate-limiter';

// Initialize rate limiter for registration
const registerRateLimiter = createRegisterRateLimiter();

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    // =========================================================================
    // CUSTOM AUTH ROUTES
    // =========================================================================
    strapi.server.routes([
      {
        method: 'POST',
        path: '/api/auth/register-coach',
        handler: async (ctx) => {
          // Apply rate limiting
          await registerRateLimiter(ctx, async () => { });

          // Check if rate limited (ctx.status would be 429)
          if (ctx.status === 429) {
            return;
          }

          // =================================================================
          // VALIDATION
          // =================================================================
          const validation: ValidationResult = validateRegisterInput(ctx.request.body);

          if (!validation.valid) {
            ctx.status = 400;
            ctx.body = {
              error: {
                status: 400,
                name: 'ValidationError',
                message: 'Validation failed',
                details: { errors: validation.errors },
              },
            };
            return;
          }

          // Sanitize input
          const { username, email, password } = sanitizeRegisterInput(ctx.request.body);

          // =================================================================
          // CHECK EXISTING USER
          // =================================================================
          const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
            where: {
              $or: [
                { email: email },
                { username: username },
              ],
            },
          });

          if (existingUser) {
            const field = existingUser.email === email ? 'email' : 'username';
            ctx.status = 400;
            ctx.body = {
              error: {
                status: 400,
                name: 'ValidationError',
                message: `This ${field} is already taken`,
                details: { field },
              },
            };
            return;
          }

          // =================================================================
          // GET COACH ROLE
          // =================================================================
          const coachRole = await strapi.query('plugin::users-permissions.role').findOne({
            where: { type: 'coach' },
          });

          if (!coachRole) {
            strapi.log.error('Coach role not found in database');
            ctx.status = 500;
            ctx.body = {
              error: {
                status: 500,
                name: 'InternalServerError',
                message: 'Server configuration error',
              },
            };
            return;
          }

          // =================================================================
          // CREATE USER
          // =================================================================
          const salt = await bcrypt.genSalt(12); // Increased from 10 to 12 rounds
          const passwordHash = await bcrypt.hash(password, salt);

          const user = await strapi.query('plugin::users-permissions.user').create({
            data: {
              username,
              email,
              password: passwordHash,
              role: coachRole.id,
              confirmed: false, // Will be true after email verification (future)
              statusUser: 'pending',
              provider: 'local',
            },
          });

          // Fetch user with role and permissions for JWT
          const userWithRole = await strapi.query('plugin::users-permissions.user').findOne({
            where: { id: user.id },
            populate: {
              role: { populate: { permissions: true } },
            },
          });

          // =================================================================
          // GENERATE JWT
          // =================================================================
          const jwt = strapi.plugin('users-permissions').service('jwt').issue({
            id: user.id,
            role: userWithRole?.role?.type || 'coach',
            // Note: Permissions are stored but should be refreshed periodically
            permissions: userWithRole?.role?.permissions?.map((p: any) => p.action) || [],
          });

          // =================================================================
          // SANITIZE & RESPOND
          // =================================================================
          const sanitizedUser = await strapi.contentAPI.sanitize.output(
            userWithRole,
            strapi.getModel('plugin::users-permissions.user')
          );

          strapi.log.info(`New coach registered: ${email}`);

          ctx.status = 201;
          ctx.body = {
            jwt,
            user: sanitizedUser,
          };
        },
        config: {
          auth: false,
        },
      },
    ]);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) { },
};

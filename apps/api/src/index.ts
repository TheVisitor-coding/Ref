import type { Core } from '@strapi/strapi';
import bcrypt from 'bcryptjs';
import {
  validateRegisterInput,
  sanitizeRegisterInput,
  type ValidationResult,
  type OnboardingData,
} from './utils/validation';
import { createRegisterRateLimiter } from './middlewares/rate-limiter';

const registerRateLimiter = createRegisterRateLimiter();

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.server.routes([
      {
        method: 'POST',
        path: '/api/auth/register-coach',
        handler: async (ctx) => {
          await registerRateLimiter(ctx, async () => { });

          if (ctx.status === 429) {
            return;
          }

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

          const { email, password } = sanitizeRegisterInput(ctx.request.body);
          const onboardingData = ctx.request.body.onboardingData as OnboardingData | undefined;

          const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
            where: {
              email: email,
            },
          });

          if (existingUser) {
            if (existingUser.email === email) {
              ctx.status = 400;
              ctx.body = {
                error: {
                  status: 400,
                  name: 'ValidationError',
                  message: 'This email is already taken',
                  details: { field: 'email' },
                },
              };
              return;
            }
          }

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

          const salt = await bcrypt.genSalt(12);
          const passwordHash = await bcrypt.hash(password, salt);

          const user = await strapi.query('plugin::users-permissions.user').create({
            data: {
              email,
              password: passwordHash,
              role: coachRole.id,
              confirmed: false,
              statusUser: 'pending',
              provider: 'local',
              ...(onboardingData && {
                first_name: onboardingData.firstName,
                coach_preferences: {
                  sports: onboardingData.selectedSports,
                  athletesCount: onboardingData.athletesCount,
                  features: onboardingData.selectedFeatures,
                },
                onboarding_completed_at: new Date().toISOString(),
              }),
            },
          });

          const userWithRole = await strapi.query('plugin::users-permissions.user').findOne({
            where: { id: user.id },
            populate: {
              role: { populate: { permissions: true } },
            },
          });

          const jwt = strapi.plugin('users-permissions').service('jwt').issue({
            id: user.id,
            role: userWithRole?.role?.type || 'coach',
            permissions: userWithRole?.role?.permissions?.map((p: any) => p.action) || [],
          });

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

  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) { },
};

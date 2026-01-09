import type { Core } from '@strapi/strapi';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import {
  validateRegisterInput,
  sanitizeRegisterInput,
  type ValidationResult,
  type OnboardingData,
} from './utils/validation';
import { sanitizeFirstName, sanitizeStringArray } from './utils/sanitize';
import { createRegisterRateLimiter } from './middlewares/rate-limiter';

const registerRateLimiter = createRegisterRateLimiter();
const shouldSeedDemoAthlete = (process.env.ENABLE_DEMO_ATHLETE_SEEDING || '').toLowerCase() === 'true';

type MinimalUser = {
  id: number;
  email: string;
};

async function attachDemoAthleteToCoach(strapi: Core.Strapi, coach: MinimalUser) {
  strapi.log.info(`Attaching demo athlete to coach: ${coach.email}`);
  const athleteRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'athlete' },
  });

  if (!athleteRole) {
    strapi.log.warn('Unable to seed demo athlete: athlete role missing');
    return;
  }

  const randomHex = crypto.randomBytes(6).toString('hex');
  const fakeEmail = `demo-athlete+${coach.id}-${Date.now()}@example.test`;
  const fakeUsername = `demo_athlete_${randomHex}`;
  const fakePasswordSalt = await bcrypt.genSalt(10);
  const fakePasswordHash = await bcrypt.hash(crypto.randomBytes(12).toString('hex'), fakePasswordSalt);
  const now = new Date().toISOString();

  const athlete = await strapi.query('plugin::users-permissions.user').create({
    data: {
      username: fakeUsername,
      email: fakeEmail,
      password: fakePasswordHash,
      role: athleteRole.id,
      confirmed: true,
      statusUser: 'active',
      provider: 'local',
      first_name: 'Athlète',
      last_name: 'Démo',
    },
  });

  await strapi.documents('api::coach-athlete.coach-athlete').create({
    data: {
      coach: coach.id,
      athlete: athlete.id,
      status_relation: 'active',
      invitation_email: fakeEmail,
      invited_at: now,
      joined_at: now,
      notes: 'Athlète démo généré automatiquement',
    },
    status: 'published',
  });

  strapi.log.info(`Demo athlete ${fakeEmail} attached to coach ${coach.email}`);
}

function generateSecureUsername(): string {
  const randomPart = crypto.randomBytes(8).toString('hex');
  return `user_${randomPart}`;
}

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

          const username = generateSecureUsername();
          
          // Generate secure confirmation token using crypto
          const crypto = require('crypto');
          const confirmationToken = crypto.randomBytes(32).toString('hex');

          const user = await strapi.query('plugin::users-permissions.user').create({
            data: {
              username,
              email,
              password: passwordHash,
              role: coachRole.id,
              confirmed: false,
              confirmationToken,
              statusUser: 'pending',
              provider: 'local',
              ...(onboardingData && {
                first_name: sanitizeFirstName(onboardingData.firstName),
                coach_preferences: {
                  sports: sanitizeStringArray(onboardingData.selectedSports),
                  athletesCount: onboardingData.athletesCount,
                  features: sanitizeStringArray(onboardingData.selectedFeatures),
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

          if (shouldSeedDemoAthlete) {
            try {
              await attachDemoAthleteToCoach(strapi, { id: user.id, email });
            } catch (error) {
              strapi.log.error('Failed to attach demo athlete to new coach', error);
            }
          }

          // Send confirmation email instead of generating JWT immediately
          try {
            const emailService = strapi.service('api::auth.email-confirmation');
            await emailService.sendConfirmationEmail(user);

            strapi.log.info(`New coach registered: ${email} - Confirmation email sent`);

            ctx.status = 201;
            ctx.body = {
              message: 'Registration successful. Please check your email to confirm your account.',
              user: {
                id: user.id,
                email: user.email,
                username: user.username,
              },
            };
          } catch (emailError) {
            strapi.log.error('Failed to send confirmation email:', emailError);
            // Still return success but with a different message
            ctx.status = 201;
            ctx.body = {
              message: 'Registration successful but failed to send confirmation email. Please contact support.',
              user: {
                id: user.id,
                email: user.email,
                username: user.username,
              },
            };
          }
        },
        config: {
          auth: false,
        },
      },
    ]);
  },

  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) { },
};

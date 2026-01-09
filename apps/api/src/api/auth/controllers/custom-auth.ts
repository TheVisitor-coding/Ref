/**
 * Custom Authentication Controller
 * 
 * Handles user login with validation and rate limiting.
 * 
 * @module api/auth/controllers/custom-auth
 */

import { ApplicationError, ValidationError } from '@strapi/utils/dist/errors';
import {
  validateLoginInput,
  sanitizeLoginInput,
  type ValidationResult,
} from '../../../utils/validation';
import { createLoginRateLimiter } from '../../../middlewares/rate-limiter';

const loginRateLimiter = createLoginRateLimiter();

/**
 * Sanitizes user object for API response
 */
const sanitizeUser = (user: any, ctx: any) => {
  const userSchema = strapi.getModel('plugin::users-permissions.user');
  return strapi.contentAPI.sanitize.output(user, userSchema, { auth: ctx.state.auth });
};

module.exports = {
  async login(ctx: any) {
    await loginRateLimiter(ctx, async () => { });

    if (ctx.status === 429) {
      return;
    }

    const validation: ValidationResult = validateLoginInput(ctx.request.body);

    if (!validation.valid) {
      throw new ValidationError('Validation failed', {
        errors: validation.errors,
      });
    }

    const { identifier, password } = sanitizeLoginInput(ctx.request.body);

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        provider: 'local',
        $or: [
          { email: identifier },
          { username: identifier },
        ],
      },
      populate: {
        role: { populate: { permissions: true } },
      },
    });

    if (!user || !user.password) {
      throw new ValidationError('Invalid identifier or password');
    }

    const validPassword = await strapi
      .plugin('users-permissions')
      .service('user')
      .validatePassword(password, user.password);

    if (!validPassword) {
      throw new ValidationError('Invalid identifier or password');
    }

    if (user.blocked === true) {
      throw new ApplicationError('Your account has been blocked by an administrator');
    }

    if (user.confirmed === false) {
      ctx.status = 403;
      ctx.body = {
        error: {
          status: 403,
          name: 'EmailNotConfirmed',
          message: 'Your email address has not been confirmed. Please check your email for the confirmation link.',
          details: {
            email: user.email,
          },
        },
      };
      return;
    }

    await strapi.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: { last_login_at: new Date().toISOString() },
    });

    const jwt = strapi.plugin('users-permissions').service('jwt').issue({
      id: user.id,
      role: user.role?.type || 'authenticated',
      permissions: user.role?.permissions?.map((p: any) => p.action) || [],
    });

    const sanitizedUser = await sanitizeUser(user, ctx);

    strapi.log.info(`User logged in: ${user.email}`);

    ctx.send({
      jwt,
      user: sanitizedUser,
    });
  },
};

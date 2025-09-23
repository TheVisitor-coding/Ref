import { ApplicationError, ValidationError } from '@strapi/utils/dist/errors';

const sanitizeUser = (user, ctx) => {
  const userSchema = strapi.getModel('plugin::users-permissions.user');
  return strapi.contentAPI.sanitize.output(user, userSchema, { auth: ctx.state.auth });
};

module.exports = {
  async login(ctx) {
    const { identifier, password } = ctx.request.body;
    if (!identifier || !password) {
      throw new ValidationError('Missing identifier or password');
    }

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        provider: 'local',
        $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
      },
      populate: {
        role: { populate: { permissions: true } },
      },
    });

    if (!user || !user.password) {
      throw new ValidationError('Invalid identifier or password');
    }

    const validPassword = await strapi.plugin('users-permissions').service('user').validatePassword(password, user.password);
    if (!validPassword) {
      throw new ValidationError('Invalid identifier or password');
    }

    if (user.confirmed === false) {
      throw new ApplicationError('Your account email is not confirmed');
    }
    if (user.blocked === true) {
      throw new ApplicationError('Your account has been blocked by an administrator');
    }

    const jwt = strapi.plugin('users-permissions').service('jwt').issue({
      id: user.id,
      role: user.role?.type || 'authenticated',
      permissions: user.role?.permissions?.map(p => p.action) || []
    });

    const sanitizedUser = await sanitizeUser(user, ctx);

    ctx.send({
      jwt,
      user: sanitizedUser,
    });
  }
};

import type { Core } from '@strapi/strapi';
const bcrypt = require('bcryptjs');

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.server.routes([
      {
        method: 'POST',
        path: '/api/auth/register-coach',
        handler: async (ctx) => {
          const { username, email, password } = ctx.request.body;
          console.log("Registering user:", { username, email });

          if (!username || !email || !password) {
            return ctx.badRequest('Username, email and password are required');
          }

          const existingUser = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });
          if (existingUser) {
            return ctx.badRequest('Email is already taken');
          }

          const coachRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { name: 'Coach' } });
          if (!coachRole) {
            return ctx.internalServerError('Coach role not found');
          }

          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(password, salt);

          const user = await strapi.query('plugin::users-permissions.user').create({
            data: {
              username,
              email: email.toLowerCase(),
              password: passwordHash,
              role: coachRole.id,
              confirmed: false,
              statusUser: 'pending',
              provider: 'local'
            }
          });

          const jwt = strapi.plugin('users-permissions').service('jwt').issue({ id: user.id });
          const sanitizedUser = await strapi.contentAPI.sanitize.output(user, strapi.getModel('plugin::users-permissions.user'));

          ctx.send({
            jwt,
            user: sanitizedUser,
          });
        },
        config: {
          auth: false,
        }
      }
    ])
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};

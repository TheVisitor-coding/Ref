export default ({ env }) => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  url: env('STRAPI_URL', 'http://localhost'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

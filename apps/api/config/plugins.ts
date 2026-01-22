export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      register: {
        allowedFields: ['username', 'email', 'password', 'statusUser'],
      },
      email: {
        enabled: true,
        confirmation: {
          enabled: true,
          redirectUrl: env('EMAIL_CONFIRMATION_URL', 'http://localhost:3000/auth/email-confirmation'),
        },
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env.int('SMTP_PORT'),
        secure: env.bool('SMTP_SECURE', false), // true si 465, sinon false
        auth: env('SMTP_USER')
          ? { user: env('SMTP_USER'), pass: env('SMTP_PASS') }
          : undefined,
        tls: {
          rejectUnauthorized: env.bool('SMTP_TLS_REJECT_UNAUTHORIZED', false),
        },
      },
      settings: {
        defaultFrom: env('SMTP_DEFAULT_FROM'),
        defaultReplyTo: env('SMTP_DEFAULT_REPLY_TO'),
      },
    },
  },
});

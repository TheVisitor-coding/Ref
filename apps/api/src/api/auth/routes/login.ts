module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/auth/login',
        handler: 'custom-auth.login',
        config: {
          auth: false,
          prefix: '',
        },
      },
    ],
  };
  
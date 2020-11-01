const MAILER_CONFIG = {
  host: '',
  port: 465,
  secure: true,
  auth: {
    username: process.env.E_MAILER_USERNAME,
    password: process.env.E_MAILER_PASSWORD,
  },
};

export default MAILER_CONFIG;

import mailer from './mailer';

export default {
  development: {
    mailer,
  },
};

export const MORGAN_LOG_FORMAT = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status' +
  ' :res[content-length] :response-time ms';

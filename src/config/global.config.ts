const PORT = 12580;

const PAGE_SIZE = 20;

const API_V1 = 'api/v1';

const MORGAN_FORMAT =
  ':remote-addr - [:date[iso]] ":method :url HTTP/:http-version" :status' + ' :res[content-length] :response-time ms';

const GLOBAL_CONFIG = {
  PORT,
  PAGE_SIZE,
  API_V1,
  MORGAN_FORMAT,
};

export default GLOBAL_CONFIG;

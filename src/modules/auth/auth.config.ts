import { PREFIX_V1 } from '../../config/controller.config';

export const MODULE_NAME = 'auth';

export const AUTH_WHITE_LIST = [
  `/${PREFIX_V1}/${MODULE_NAME}/register`,
  `/${PREFIX_V1}/${MODULE_NAME}/login`,
  `/${PREFIX_V1}/${MODULE_NAME}/sendEmail`,
  `/${PREFIX_V1}/${MODULE_NAME}/resetPassword`,
];

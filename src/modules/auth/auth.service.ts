import { hashPassword } from '../../helper/common';

export class AuthService {
  constructor(options = {}) {
  }

  comparePassword(oldPassword, newPassword): boolean {
    return hashPassword(newPassword) === oldPassword;
  }

}

let service;
export default (options = {}) => {
  if (!service) {
    service = new AuthService(options);
  }
  return service;
};

import { hashPassword } from '../../helper/utils';

export function comparePassword(oldPassword, newPassword): boolean {
  return hashPassword(newPassword) === oldPassword;
}

const authService = {
  comparePassword,
};

export default authService;

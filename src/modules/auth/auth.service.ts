export class AuthService {
  constructor(options = {}) {}
}

let service;
export default (options = {}) => {
  if (!service) {
    service = new AuthService(options);
  }
  return service;
};

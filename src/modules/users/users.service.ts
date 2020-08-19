export class UsersService {
  constructor(options = {}) {}
}

let service;
export default (options = {}) => {
  if (!service) {
    service = new UsersService(options);
  }
  return service;
};

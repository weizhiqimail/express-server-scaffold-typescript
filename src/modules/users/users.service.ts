export class UsersService {
  constructor(options = {}) {
    console.log(options);
  }
}

let service;
export default (options = {}) => {
  if (!service) {
    service = new UsersService(options);
  }
  return service;
}



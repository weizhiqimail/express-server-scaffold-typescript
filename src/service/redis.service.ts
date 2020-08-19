export class RedisService {
  constructor(options = {}) {}
}

let service;
export default (options = {}) => {
  if (!service) {
    service = new RedisService(options);
  }
  return service;
};

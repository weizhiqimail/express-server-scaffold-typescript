export class MailService {
  constructor(options = {}) {}
}

let service;
export default (options = {}) => {
  if (!service) {
    service = new MailService(options);
  }
  return service;
};

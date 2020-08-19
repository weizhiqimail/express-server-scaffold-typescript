export class ViewsService {
  constructor(options = {}) {

  }
}

let service;
export default (options = {}) => {
  if (!service) {
    service = new ViewsService(options);
  }
  return service;
}

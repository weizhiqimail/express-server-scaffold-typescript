import { getRepository } from 'typeorm';

import { Users } from '../orm/entity/users.entity';

export class UsersOrmService {
  constructor(options = {}) {
  }

  async create(user: Users): Promise<Users> {
    return await getRepository(Users).save(user);
  }

  async findById(id: string | number): Promise<Users> {
    return await getRepository(Users).findOne(id);
  }

  async findByIds(ids: Array<string | number>): Promise<Array<Users>> {
    return await getRepository(Users).findByIds(ids);
  }

  async findByEmail(email: string): Promise<Users> {
    return await getRepository(Users).findOne({ email });
  }

  async updateById(id: string | number, data) {
    return await getRepository(Users).update(id, data);
  }

}

let service;
export default (options = {}) => {
  if (!service) {
    service = new UsersOrmService(options);
  }
  return service;
};

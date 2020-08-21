import { getRepository } from 'typeorm';

import { Users } from './entity/users.entity';

export async function createUserOrm(user: Users): Promise<Users> {
  return await getRepository(Users).save(user);
}

export async function findByIdOrm(id: string | number): Promise<Users> {
  return await getRepository(Users).findOne(id);
}

export async function findByIdsOrm(ids: Array<string | number>): Promise<Array<Users>> {
  return await getRepository(Users).findByIds(ids);
}

export async function findByEmailOrm(email: string): Promise<Users> {
  return await getRepository(Users).findOne({ email });
}

export async function updateByIdOrm(id: string | number, data) {
  return await getRepository(Users).update(id, data);
}

const usersOrmService = {
  createUserOrm,
  findByIdOrm,
  findByIdsOrm,
  findByEmailOrm,
  updateByIdOrm,
};

export default usersOrmService;

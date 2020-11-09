export enum IUserStatus {
  SLEEP = 'SLEEP',
  ACTIVE = 'ACTIVE',
  FREEZE = 'FREEZE',
  CLOSE = 'CLOSE',
}

type IUserStatusProps<T> = { [key in keyof typeof IUserStatus]: T };

export const IUserStatusCn: IUserStatusProps<string> = {
  SLEEP: '待激活',
  ACTIVE: '正常',
  FREEZE: '冻结',
  CLOSE: '注销',
};

export enum IUserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NONE = 'NONE',
}

type IUserGenderProps<T> = { [key in keyof typeof IUserGender]: T };

export const IUserGenderCn: IUserGenderProps<string> = {
  MALE: '男',
  FEMALE: '女',
  NONE: '未知',
};

enum IUserResponseCode {
  EMAIL_EXIST,
  WRONG_PASSWORD,
}

export type IUserResponseCodeProps<T> = {
  [key in keyof typeof IUserResponseCode]: T;
};

export interface IJwtSign {
  token: string;
  user: object;
  iat: number;
  exp: number;
}

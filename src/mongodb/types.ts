export enum IMONGO_TABLE_NAME {
  UserMember = 'user_members',
}

export const commonFields = {
  createTime: { type: Date, default: new Date() },
  updateTime: { type: Date, default: new Date() },
  remark: { type: String, default: '' },
};

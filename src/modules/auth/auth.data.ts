export const EMAIL = {
  minLength: 10,
  maxLength: 32,
  lengthMessage: '邮箱长度必须在 10 到 32 位',
  isEmailMessage: '邮箱格式不合法',
};

export const PASSWORD = {
  minLength: 10,
  maxLength: 32,
  lengthMessage: '密码长度必须在 10 到 32 位',
  matchMessage: '两次输入的密码不一致',
};

export const NEED_USER = {
  isBoolean: 'needUser 必须是布尔值',
};

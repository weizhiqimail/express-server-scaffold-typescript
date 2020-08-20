export const EMAIL = {
  minLength: 10,
  maxLength: 32,
  lengthMessage: '邮箱长度必须在 10 到 32 为之间',
  isEmailMessage: '邮箱格式不合法',
};

export const PASSWORD = {
  minLength: 10,
  maxLength: 32,
  lengthMessage: '密码长度必须在 10 到 32 位之间',
  matchMessage: '两次输入的密码不一致',
};

export const CAPTCHA = {
  length: 6,
  lengthMessage: '验证码长度必须为 6 位',
};

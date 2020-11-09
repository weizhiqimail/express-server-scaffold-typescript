const USER_DTO_ERROR = {
  EMAIL: {
    minLength: 10,
    maxLength: 32,
    length: '邮箱长度必须在 10 到 32 位',
    isEmail: '邮箱格式不合法',
  },
  PASSWORD: {
    minLength: 10,
    maxLength: 32,
    length: '密码长度必须在 10 到 32 位',
    IsMatchCustom: '两次输入的密码不一致',
  },
};

export default USER_DTO_ERROR;

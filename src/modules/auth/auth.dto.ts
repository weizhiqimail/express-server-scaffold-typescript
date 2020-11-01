import { IsEmail, Length } from 'class-validator';

import { ClassValidatorMatch } from '../../helper/class-validator.match';
import { EMAIL, PASSWORD, CAPTCHA } from './auth.data';

export class AuthLoginDto {
  @IsEmail({}, { message: EMAIL.isEmailMessage })
  @Length(EMAIL.minLength, EMAIL.maxLength, { message: EMAIL.lengthMessage })
  public email: string;

  @Length(CAPTCHA.length, CAPTCHA.length, {
    message: CAPTCHA.lengthMessage,
  })
  public captcha: string;

  @Length(PASSWORD.minLength, PASSWORD.maxLength, {
    message: PASSWORD.lengthMessage,
  })
  public password: string;
}

export class AuthRegisterDto extends AuthLoginDto {
  @Length(PASSWORD.minLength, PASSWORD.maxLength, {
    message: PASSWORD.lengthMessage,
  })
  @ClassValidatorMatch('password', {
    message: PASSWORD.matchMessage,
  })
  public password2: string;
}

import { IsEmail, Length, IsOptional, isBoolean } from 'class-validator';

import { ClassValidatorMatch } from '../../helper/class-validator.match';
import { EMAIL, PASSWORD, NEED_USER } from './auth.data';

export class AuthLoginDto {
  @IsEmail({}, { message: EMAIL.isEmailMessage })
  @Length(EMAIL.minLength, EMAIL.maxLength, { message: EMAIL.lengthMessage })
  public email: string;

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

export class AuthValidateJwtTokenDto {
  @IsOptional()
  public needUser: boolean = false;
}

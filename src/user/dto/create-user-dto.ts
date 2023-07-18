import { IsEmail, IsString, MinLength, NotContains } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @NotContains(' ')
  name: string;

  @IsEmail()
  @NotContains(' ')
  email: string;

  @IsString()
  @MinLength(6)
  @NotContains(' ')
  password: string;
}

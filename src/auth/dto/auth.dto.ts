import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthRegisterDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}

export class AuthLoginDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
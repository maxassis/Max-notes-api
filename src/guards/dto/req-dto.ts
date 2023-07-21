import { IsEmail, IsNumber, IsObject, IsString } from 'class-validator';

export class ReqDTO {
  @IsObject()
  tokenPayLoad: {
    sub: number,
    name: string,
    email: string,
    iat: number,
    exp: number,
    iss: string
  }
  
  // @IsString()
  // sub: string;

  // @IsString()
  // name: string

  // @IsEmail()
  // email: string

  // @IsNumber()
  // iat: number
  
  // @IsNumber()
  // exp: number
  
  // @IsString()
  // iss:string
}



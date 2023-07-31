import { IsBoolean, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  color: string

  @IsBoolean()
  deleted: boolean
}

import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class PostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}

export class UpdatePostDto extends PartialType(PostDto) {}
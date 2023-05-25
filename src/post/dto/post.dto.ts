import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class PostDto {
  @ApiProperty({
    example: 'This is Title',
    description: '제목',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is Post Content',
    description: '본문',
    required: true,
  })
  @IsNotEmpty()
  body: string;
}

export class UpdatePostDto extends PartialType(PostDto) {}
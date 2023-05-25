import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class SearchCommentDto {
  @ApiProperty({
    example: 'post',
    description: 'commentableType',
    required: true,
  })
  @IsNotEmpty()
  commentableType: string;

  @ApiProperty({
    example: 1,
    description: 'commentableId',
    required: true,
  })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  commentableId: number;
  
  @ApiProperty({
    example: 10,
    description: 'take',
    required: true,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  take: number = 10;

  @ApiProperty({
    example: 0,
    description: 'skip',
    required: true,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  skip: number = 0;
}

export class CommentDto {
  @ApiProperty({
    example: 'post',
    description: 'commentableType',
    required: true,
  })
  @IsNotEmpty()
  commentableType: string;

  @ApiProperty({
    example: 1,
    description: 'commentableId',
    required: true,
  })
  @IsNumber()
  commentableId: number;

  @ApiProperty({
    example: 'This is Comment Content',
    description: '본문',
    required: true,
  })
  @IsNotEmpty()
  body: string;
}

export class UpdateCommentDto extends PartialType(CommentDto) {}

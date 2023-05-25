import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchCommentDto {
  @IsNotEmpty()
  commentableType: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  commentableId: number;
  
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  take: number = 10;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  skip: number = 0;
}

export class CommentDto {
  @IsNotEmpty()
  commentableType: string;

  @IsNumber()
  commentableId: number;

  @IsNotEmpty()
  body: string;
}

export class UpdateCommentDto extends PartialType(CommentDto) {}

import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  // @IsNumber()
  // @IsOptional()
  @Transform(({ value }) => parseInt(value))
  parentId: number;

  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  order: number = 0;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
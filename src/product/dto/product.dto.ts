import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsNotEmpty, IsString } from 'class-validator';


export class SearchProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  categoryId: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  take: number = 10;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  skip: number = 0;
}

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber({}, { each: true })
  categoryIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

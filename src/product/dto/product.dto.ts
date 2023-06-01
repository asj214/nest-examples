import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber({}, { each: true })
  categoryIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

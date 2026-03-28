import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Har ek item ka DTO
export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true }) // har item validate hoga
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @IsString()
  @IsNotEmpty()
  shippingAddress!: string;
}

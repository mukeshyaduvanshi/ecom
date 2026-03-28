import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/auth/roles.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // Open koi bhi dekh sakta hai
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // Open koi bhi ek product dekh sakta hai
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  // Only Admin
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createProductDto : CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  // Only Admin
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put()
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}

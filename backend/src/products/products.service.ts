import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModal: Model<ProductDocument>,
  ) {}

  // find all product
  async findAll(): Promise<ProductDocument[]> {
    return this.productModal.find({ isAvailable: true });
  }

  // find product by id
  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModal.findById(id);
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return product;
  }

  // create product
  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const product = new this.productModal(createProductDto);
    return product.save();
  }

  // Update Product
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    const product = await this.productModal.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true }, // update return document
    );
    if (!product) {
      throw new NotFoundException(`Product Not Found`);
    }
    return product;
  }

  // Delete Product
  async remove(id: string): Promise<{ message: string }> {
    const product = await this.productModal.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return { message: 'Product Delete Successfully' };
  }
}

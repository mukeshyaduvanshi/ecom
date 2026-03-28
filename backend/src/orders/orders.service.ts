import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order, OrderDocument } from './order.schema';
import { Model, Types } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    private productService: ProductsService, // product check karna ke liye
  ) {}

  async create(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<OrderDocument> {
    let totalAmount = 0;
    const orderItems:Order['items'] = [];

    // Har item ke liye product check karo
    for (const item of createOrderDto.items) {
      const product = await this.productService.findOne(item.productId);

      // Stock check
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `${product.name} is less then the ${product.stock}`,
        );
      }

      //Total calculate
      totalAmount += product.price * item.quantity;

      orderItems.push({
        productId: new Types.ObjectId(item.productId),
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    // Create Order
    const order = new this.orderModel({
      userId: new Types.ObjectId(userId),
      items: orderItems,
      totalAmount,
      shippingAddress: createOrderDto.shippingAddress,
    });
    return order.save();
  }

  async findMyOrder(userId: string): Promise<OrderDocument[]> {
    return this.orderModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 }); // latest one
  }

  // Admin All Order
  async findAll(): Promise<OrderDocument[]> {
    return this.orderModel
      .find()
      .populate('userId', 'name email') // user details
      .sort({ createdAt: -1 });
  }

  // Signal Order detail
  async findOne(id: string): Promise<OrderDocument> {
    const order = await this.orderModel
      .findById(id)
      .populate('userId', 'name email');

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  // Amdin Change Order status
  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusDto,
  ): Promise<OrderDocument> {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status: updateStatusDto.status },
      { new: true },
    );
    if (!order) {
      throw new NotFoundException('Order not Found');
    }
    return order;
  }
}

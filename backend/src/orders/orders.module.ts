import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Order.name, schema: OrderSchema}
    ]),
    ProductsModule, // ProductsService use karne ke liye
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}

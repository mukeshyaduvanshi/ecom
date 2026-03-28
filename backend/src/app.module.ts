import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import {MongooseModule} from "@nestjs/mongoose"
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [
    // .env load
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,

    // Connect MongoDB
    MongooseModule.forRoot(process.env.MONGODB_URI!),

    AuthModule,

    UsersModule,

    ProductsModule,

    OrdersModule
  ]
})
export class AppModule {}

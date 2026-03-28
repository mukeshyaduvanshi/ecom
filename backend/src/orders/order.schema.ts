import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ _id: false }) //alag _id nahi chahiye
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string; // product ka name order mein save karo

  @Prop({ required: true })
  price!: number; // us waqt ka price save karo

  @Prop({ required: true, min: 1 })
  quantity!: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ type: [OrderItemSchema], required: true })
  items!: OrderItem[];

  @Prop({ required: true })
  totalAmount!: number;

  @Prop({
    default: 'pending',
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
  })
  status!: string;

  @Prop({ required: true })
  shippingAddress!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

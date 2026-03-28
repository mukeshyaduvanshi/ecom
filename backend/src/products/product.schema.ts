import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>


@Schema({timestamps: true})
export class Product {
    @Prop({required: true})
    name!:string;

    @Prop({required:true})
    description!: string;

    @Prop({required:true})
    price!:number;

    @Prop({required:true})
    stock!:number;

    @Prop({default:''})
    image!:string;

    @Prop({default:true})
    isAvailable!:boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product)
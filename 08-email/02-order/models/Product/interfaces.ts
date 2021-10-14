import { Model, Schema, Document } from 'mongoose';

export interface ProductSchema {
  title: string;
  description: string;
  price: number;
  category: Schema.Types.ObjectId;
  subcategory: Schema.Types.ObjectId;
  images: string[];
}

export interface ProductDocument extends ProductSchema, Document {}

export interface ProductModel extends Model<ProductDocument> {}

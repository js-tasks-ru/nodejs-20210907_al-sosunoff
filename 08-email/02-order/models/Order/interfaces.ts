import { Model, Schema, Document } from 'mongoose';

export interface OrderSchema {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  phone: string;
  address: string;
}

export interface OrderDocument extends OrderSchema, Document {}

export interface OrderModel extends Model<OrderDocument> {}

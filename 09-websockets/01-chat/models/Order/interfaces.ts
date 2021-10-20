import { Model, Schema, Document } from 'mongoose';
import { ProductDocument } from '../Product/interfaces';

export interface OrderSchema {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId | ProductDocument;
  phone: string;
  address: string;
}

export interface OrderDocument extends OrderSchema, Document {}

export interface OrderModel extends Model<OrderDocument> {}

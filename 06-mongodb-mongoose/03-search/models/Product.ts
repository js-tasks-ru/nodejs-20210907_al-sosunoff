import { Model, Schema, Document } from 'mongoose';
import { connection } from '../libs/connection';

interface IProductSchema {
    title: string,
    description: string,
    price: number,
    category: Schema.Types.ObjectId,
    subcategory: Schema.Types.ObjectId,
    images: string[],
}

const productSchema = new Schema<IProductSchema, Model<IProductSchema>, IProductSchema>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: Schema.Types.ObjectId, required: true },
    images: [String]
});

productSchema.index(
  { title: 'text', description: 'text' },
  { 
    name: 'TextSearchIndex', 
    default_language: 'russian',
    weights: { title: 10, description: 5, }
  });

export interface IProductDocument extends IProductSchema, Document {}

export interface IProductModel extends Model<IProductDocument> {}

export const Product = connection.model<IProductDocument, IProductModel>('Product', productSchema);

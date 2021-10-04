import { Model, Schema } from 'mongoose';
import { connection } from '../libs/connection';

interface IProduct {
    title: string,
    description: string,
    price: number,
    category: Schema.Types.ObjectId,
    subcategory: Schema.Types.ObjectId,
    images: string[],
}

const productSchema = new Schema<IProduct, Model<IProduct>, IProduct>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: Schema.Types.ObjectId, required: true },
    images: [String]
});

export const Product = connection.model('Product', productSchema);

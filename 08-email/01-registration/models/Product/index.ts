import { Schema } from 'mongoose';
import { connection } from '../../libs/connection';
import { ProductDocument, ProductModel, ProductSchema } from './interfaces';

const productSchema = new Schema<ProductDocument, ProductModel, ProductSchema>({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  subcategory: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  images: [String],
});

export const Product = connection.model('Product', productSchema);

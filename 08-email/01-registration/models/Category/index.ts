import { Schema, Model } from 'mongoose';
import { connection } from '../../libs/connection';
import { SubCategoryDocument, schema as subCategorySchema } from './SubCategory';

export interface CategorySchema {
  title: string;
  subcategories: SubCategoryDocument[];
}

export interface CategoryDocument extends CategorySchema, Document {}

export interface CategoryModel extends Model<CategoryDocument> {}

const schema = new Schema<CategoryDocument, CategoryModel, CategorySchema>({
  title: {
    type: String,
    required: true,
  },

  subcategories: [subCategorySchema],
});

export const Category = connection.model<CategoryDocument, CategoryModel>('Category', schema);

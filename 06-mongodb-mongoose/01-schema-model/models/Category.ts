import { Schema, Model } from 'mongoose';
import { connection } from '../libs/connection';

interface ISubCategory {
  title: string;
}

const subCategorySchema = new Schema<ISubCategory, Model<ISubCategory>, ISubCategory>({
    title: { type: String, required: true }
});

interface ICategory {
  title: string;
  subcategories: ISubCategory[];
}

const categorySchema = new Schema<ICategory, Model<ICategory>, ICategory>({
    title: { type: String, required: true },
    subcategories: [subCategorySchema]
});

export const Category = connection.model('Category', categorySchema);

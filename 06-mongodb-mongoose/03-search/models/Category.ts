import { Schema, Model, Document, Types } from 'mongoose';
import { connection } from '../libs/connection';

//#region ISubCategory
export interface ISubCategorySchema {
  title: string;
}

const subCategorySchema = new Schema<ISubCategorySchema, Model<ISubCategorySchema>, ISubCategorySchema>({
    title: { type: String, required: true }
});

export interface ISubCategoryDocument extends ISubCategorySchema, Document {}

export interface ISubCategoryModel extends Model<ISubCategoryDocument> {}

// export const SubCategory = connection.model<ISubCategoryDocument, ISubCategoryModel>('Category', subCategorySchema);
//#endregion

export interface ICategorySchema {
  title: string;
  subcategories: ISubCategoryDocument[];
}

export const categorySchema = new Schema<ICategorySchema, Model<ICategorySchema>, ICategorySchema>({
    title: { type: String, required: true },
    subcategories: [subCategorySchema]
});

export interface ICategoryDocument extends ICategorySchema, Document {} 

export interface ICategoryModel extends Model<ICategoryDocument> {}

export const Category = connection.model<ICategoryDocument, ICategoryModel>('Category', categorySchema);
//#endregion

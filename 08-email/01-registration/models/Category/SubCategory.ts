import { Schema, Model } from 'mongoose';
import { connection } from '../../libs/connection';

export interface SubCategorySchema {
    title: string;
}
  
export interface SubCategoryDocument extends SubCategorySchema, Document {}
  
export interface SubCategoryModel extends Model<SubCategoryDocument> {}

export const schema = new Schema<SubCategoryDocument, SubCategoryModel, SubCategorySchema>({
    title: { type: String, required: true }
});

export const SubCategory = connection.model<SubCategoryDocument, SubCategoryModel>('SubCategory', schema);
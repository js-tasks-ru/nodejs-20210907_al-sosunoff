import { ISubCategoryDocument, ICategoryDocument } from '../../models/Category/index';

export const mapSubCategories = (docs: ISubCategoryDocument[]) =>
  docs.map(({ _id, title }) => ({
    id: _id,
    title,
  }));
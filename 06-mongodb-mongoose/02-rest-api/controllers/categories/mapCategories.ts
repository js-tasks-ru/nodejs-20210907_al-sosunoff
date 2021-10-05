import { ICategoryDocument } from '../../models/Category/index';
import { mapSubCategories } from './mapSubCategories';

export const mapCategories = (docs: ICategoryDocument[]) =>
  docs.map(({ _id, title, subcategories }) => ({
    id: _id,
    title,
    subcategories: mapSubCategories(subcategories),
  }));

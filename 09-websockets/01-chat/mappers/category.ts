import { CategoryDocument } from './../models/Category';

export const mapCategory = (category: CategoryDocument) => ({
  id: category._id,
  title: category.title,
  subcategories: category.subcategories.map((subcategory) => ({
    id: subcategory._id,
    title: subcategory.title,
  })),
});

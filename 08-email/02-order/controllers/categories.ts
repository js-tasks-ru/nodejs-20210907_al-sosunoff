import { router } from '../app';
import { Category } from '../models/Category';
import { mapCategory } from '../mappers/category';

export const categoryList: Parameters<typeof router.get>['2'] = async (
  ctx,
  next
) => {
  const categories = await Category.find();

  ctx.body = { categories: categories.map(mapCategory) };
};

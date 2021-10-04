import { router } from '../../app';
import { Category } from '../../models/Category';
import { mapCategories } from './mapCategories';

export const categoryList: Parameters<typeof router.get>['2'] = async (
  ctx,
  next
) => {
  const categories = await Category.find();

  ctx.body = {
    categories: mapCategories(categories),
  };
};

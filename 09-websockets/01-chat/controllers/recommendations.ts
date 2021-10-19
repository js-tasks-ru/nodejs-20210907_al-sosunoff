import { router } from '../app';
import { Product } from '../models/Product';
import { mapProduct } from '../mappers/product';

export const recommendationsList: Parameters<typeof router.get>['2'] = async (
  ctx,
  next
) => {
  const recommendations = await Product.find().limit(6);

  ctx.body = { recommendations: recommendations.map(mapProduct) };
};

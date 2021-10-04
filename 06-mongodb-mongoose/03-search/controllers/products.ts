import { router } from '../app';

export const productsByQuery: Parameters<typeof router.get>['2'] = async function productsByQuery(ctx, next) {
  ctx.body = { products: [] };
};

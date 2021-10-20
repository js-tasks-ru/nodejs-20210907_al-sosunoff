import mongoose from 'mongoose';
import { router } from '../app';
import { Product } from '../models/Product';
import { mapProduct } from '../mappers/product';

export const productsBySubcategory: Parameters<typeof router.get>['2'] = async (
  ctx,
  next
) => {
  const { subcategory } = ctx.query;

  if (!subcategory) return next();

  const products = await Product.find({ subcategory: subcategory as any as mongoose.Schema.Types.ObjectId }).limit(20);

  ctx.body = { products: products.map(mapProduct) };
};

export const productsByQuery: Parameters<typeof router.get>['2']  = async (ctx, next) => {
  const { query } = ctx.query;

  if (!query) return next();

  const products = await Product
      .find({$text: {$search: query as string}}, {score: {$meta: 'textScore'}})
      .sort({score: {$meta: 'textScore'}})
      .limit(20);

  ctx.body = { products: products.map(mapProduct) };
};

export const productList: Parameters<typeof router.get>['2'] = async (
  ctx,
  next
) => {
  const products = await Product.find().limit(20);

  ctx.body = { products: products.map(mapProduct) };
};

export const productById: Parameters<typeof router.get>['2'] = async (
  ctx,
  next
) => {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(400, 'invalid product id');
  }

  const product = await Product.findById(ctx.params.id);

  if (!product) {
    return ctx.throw(404, `no product with ${ctx.params.id} id`);
  }

  ctx.body = { product: mapProduct(product) };
};

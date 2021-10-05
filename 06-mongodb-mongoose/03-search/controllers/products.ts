import { router } from '../app';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { mapProducts } from './mapProducts';

export const productsByQuery: Parameters<typeof router.get>['2'] =
  async function productsByQuery(ctx, next) {
    const { query } = ctx.query;

    if (!query) return;

    if (Array.isArray(query)) return;

    const products = await Product.find({
      $or: [
        { title: { $regex: query } }, 
        { description: { $regex: query } }
      ],
    });

    ctx.body = { products: mapProducts(products), query };
  };

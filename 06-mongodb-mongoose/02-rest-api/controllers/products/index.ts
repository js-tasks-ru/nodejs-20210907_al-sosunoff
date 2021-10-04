import { router } from '../../app';
import { Category } from '../../models/Category';
import { Product } from '../../models/Product';
import { Types } from 'mongoose';
import { mapProducts } from './mapProducts';
import { InvalidProductIdError } from './InvalidProductIdError';
import { NotFoundProductByIdError } from './NotFoundProductByIdError';
import { mapProduct } from './mapProduct';

export const productsBySubcategory: Parameters<typeof router.get>['2'] =
  async (ctx, next) => {
    const { subcategory } = ctx.query;

    if (!subcategory) return next();
    
    if (Array.isArray(subcategory)) return next();
    
    const doc = await Category.getSubcategory(subcategory as string);

    if(!doc) {
      ctx.body = {
        products: []
      };

      return;
    };

    const products = await Product.find({
      'subcategory': doc._id
    });

    ctx.body = { products: mapProducts(products) };
  };

export const productList: Parameters<typeof router.get>['2'] =
  async (ctx, next) => {
    const products = await Product.find();

    ctx.body = { products: mapProducts(products) };
  };

export const productById: Parameters<typeof router.get>['2'] =
  async (ctx, next) => {
    const { id } = ctx.params;

    if(!Types.ObjectId.isValid(id)) {
      throw new InvalidProductIdError(400);
    }

    const product = await Product.findById(id);

    if(product) {
      ctx.body = { product: mapProduct(product) };
    } else {
      throw new NotFoundProductByIdError(404); 
    }
  };

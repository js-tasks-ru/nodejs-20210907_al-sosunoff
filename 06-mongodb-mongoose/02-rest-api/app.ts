import Koa from 'koa';
import Router from 'koa-router';
import {
  productsBySubcategory,
  productList,
  productById,
} from './controllers/products';
import { categoryList } from './controllers/categories';

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = { error: err.message };
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }
});

const router = new Router({ prefix: '/api' });

router.get('/categories', categoryList);

router.get('/products', productsBySubcategory, productList);

router.get('/products/:id', productById);

app.use(router.routes());

export { app, router };

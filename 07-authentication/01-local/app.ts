import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import { login } from './controllers/login';
import koaStatic from 'koa-static';
import koaBodyparser from 'koa-bodyparser';

const app = new Koa();

app.use(koaStatic(path.join(__dirname, 'public')));
app.use(koaBodyparser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
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

router.post('/login', login);

app.use(router.routes());

export { app, router };

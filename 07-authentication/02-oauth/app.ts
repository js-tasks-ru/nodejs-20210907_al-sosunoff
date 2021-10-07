import path from 'path';
import Koa from 'koa';
import cors from '@koa/cors';
import koaStatic from 'koa-static';
import koaBodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import fs from 'fs';

import { handleMongooseValidationError } from './libs/validationErrors';
import { login } from './controllers/login';
import { oauth, oauthCallback } from './controllers/oauth';

const app = new Koa();

app.use(cors());
app.use(koaStatic(path.join(__dirname, 'public')));
app.use(koaBodyparser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message};
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
});

const router = new Router({prefix: '/api'});

router.post('/login', login);

router.get('/oauth/:provider', oauth);
router.post('/oauth_callback', handleMongooseValidationError, oauthCallback);

app.use(router.routes());

// this for HTML5 history in browser

const index = fs.readFileSync(path.join(__dirname, 'public/index.html'));

app.use(async (ctx) => {
  if (ctx.url.startsWith('/api') || ctx.method !== 'GET') return;

  ctx.set('content-type', 'text/html');

  ctx.body = index;
});

export { app, router };

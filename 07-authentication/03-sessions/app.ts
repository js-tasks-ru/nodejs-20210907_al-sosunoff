import path from 'path';
import Koa, { DefaultState, DefaultContext } from 'koa';
import cors from '@koa/cors';
import koaStatic from 'koa-static';
import koaBodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import { v4 as uuid } from 'uuid';

import { Session } from './models/Session';
import { handleMongooseValidationError } from './libs/validationErrors';
import { mustBeAuthenticated } from './libs/mustBeAuthenticated';
import { login } from './controllers/login';
import { oauth, oauthCallback } from './controllers/oauth';
import { me } from './controllers/me';
import { UserSchema } from './models/User/interfaces';
import { catchErrorMiddleware } from './middleware/catchErrorMiddleware';
import { indexMiddleware } from './middleware/indexMiddleware';

interface Context extends DefaultContext {
  user: UserSchema;
  login: (user: UserSchema) => Promise<string>;
}

const app = new Koa<DefaultState, Context>();

/* app.use(cors()); */
app.use(koaStatic(path.join(__dirname, 'public')));
app.use(koaBodyparser());
app.use(catchErrorMiddleware);
app.use((ctx, next) => {
  ctx.login = async (user) => {
    const token = uuid();

    return token;
  };

  return next();
});

const router = new Router<any, Context>({ prefix: '/api' });

router.use(async (ctx, next) => {
  const header = ctx.request.get('Authorization');

  if (!header) return next();

  return next();
});

router.post('/login', login);
router.get('/oauth/:provider', oauth);
router.post('/oauth_callback', handleMongooseValidationError, oauthCallback);
router.get('/me', me);

app.use(router.routes());
app.use(indexMiddleware);

export { app, router };

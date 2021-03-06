import path from 'path';
import Koa, { DefaultState } from 'koa';
import koaStatic from 'koa-static';
import koaBodyparser from 'koa-bodyparser';
import Router from 'koa-router';

import { handleMongooseValidationError } from './libs/validationErrors';
import { login } from './controllers/login';
import { oauth, oauthCallback } from './controllers/oauth';
import { me } from './controllers/me';
import { UserDocument } from './models/User/interfaces';
import { catchErrorMiddleware } from './middleware/catchErrorMiddleware';
import { indexMiddleware } from './middleware/indexMiddleware';
import { createTokenMiddleware } from './middleware/createTokenMiddleware';
import { sessionUpdateMiddleware } from './middleware/sessionUpdateMiddleware';
import { getTokenFromAuthorization } from './middleware/getTokenFromAuthorization';
import { getSessionMiddleware } from './middleware/getSessionMiddleware';

interface CustomContext {
  user: {
    email: string;
    displayName: string;
  };
  createTokenMiddleware: (user: UserDocument) => Promise<string>;
  token: string,
}

const app = new Koa<DefaultState, CustomContext>();
const router = new Router<{}, CustomContext>({ prefix: '/api' });

app.use(koaStatic(path.join(__dirname, 'public')));
app.use(koaBodyparser());
app.use(catchErrorMiddleware);
app.use(createTokenMiddleware);

router.post('/login', login);
router.get('/oauth/:provider', oauth);
router.post('/oauth_callback', handleMongooseValidationError, oauthCallback);
router.get('/me', 
  getTokenFromAuthorization, 
  getSessionMiddleware, 
  sessionUpdateMiddleware, 
  me);

app.use(router.routes());
app.use(indexMiddleware);

export { app, router };

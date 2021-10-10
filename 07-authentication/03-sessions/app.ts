import path from 'path';
import Koa, { DefaultState, DefaultContext } from 'koa';
import koaStatic from 'koa-static';
import koaBodyparser from 'koa-bodyparser';
import Router from 'koa-router';

import { handleMongooseValidationError } from './libs/validationErrors';
import { mustBeAuthenticated } from './libs/mustBeAuthenticated';
import { login } from './controllers/login';
import { oauth, oauthCallback } from './controllers/oauth';
import { me } from './controllers/me';
import { UserDocument } from './models/User/interfaces';
import { catchErrorMiddleware } from './middleware/catchErrorMiddleware';
import { indexMiddleware } from './middleware/indexMiddleware';
import { getTokenMiddleware } from './middleware/getTokenMiddleware';
import { mapUser } from './models/User/mapUser';
import { sessionUpdateMiddleware } from './middleware/sessionUpdateMiddleware';
import { getTokenFromAuthorization } from './middleware/getTokenFromAuthorization';
import { SessionDocument } from './models/Session/interfaces';
import { getSessionMiddleware } from './middleware/getSessionMiddleware';

interface Context extends DefaultContext {
  user: ReturnType<typeof mapUser>;
  sessionDocument: SessionDocument;
  getToken: (user: UserDocument) => Promise<string>;
  token: string,
}

const app = new Koa<DefaultState, Context>();

app.use(koaStatic(path.join(__dirname, 'public')));
app.use(koaBodyparser());
app.use(catchErrorMiddleware);
app.use(getTokenMiddleware);

const router = new Router<any, Context>({ prefix: '/api' });

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

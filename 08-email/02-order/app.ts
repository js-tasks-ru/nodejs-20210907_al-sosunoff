import Koa, { DefaultState } from 'koa';
import koaBodyparser from 'koa-bodyparser';
import Router from 'koa-router';

import { UserDocument } from './models/User/interfaces';
import { catchErrorMiddleware } from './middleware/catchErrorMiddleware';
import { createTokenMiddleware } from './middleware/createTokenMiddleware';
import { authMiddleware } from './middleware/authMiddleware';

import { handleMongooseValidationError } from './libs/validationErrors';
import { mustBeAuthenticated } from './libs/mustBeAuthenticated';
import {
  productsBySubcategory,
  productList,
  productById,
} from './controllers/products';
import { categoryList }  from './controllers/categories';
import { login } from './controllers/login';
import { oauth, oauthCallback } from './controllers/oauth';
import { me } from './controllers/me';
import { register, confirm } from './controllers/registration';
import { checkout, getOrdersList } from './controllers/orders';

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

app.use(koaBodyparser());
app.use(catchErrorMiddleware);
app.use(createTokenMiddleware);

router.use(...authMiddleware);

router.get('/categories', categoryList);
router.get('/products', productsBySubcategory, productList);
router.get('/products/:id', productById);

router.post('/login', login);

router.get('/oauth/:provider', oauth);
router.post('/oauth_callback', handleMongooseValidationError, oauthCallback);

router.get('/me', mustBeAuthenticated, me);

router.post('/register', handleMongooseValidationError, register);
router.post('/confirm', confirm);

router.get('/orders', mustBeAuthenticated, getOrdersList);
router.post('/orders', mustBeAuthenticated, checkout);

app.use(router.routes());

export { app, router };

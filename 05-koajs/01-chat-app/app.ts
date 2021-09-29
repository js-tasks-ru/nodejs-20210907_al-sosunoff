import path from 'path';
import Koa, { ExtendableContext } from 'koa';
import koaStatic from 'koa-static';
import koaBodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import { publishPost, subscribeGet } from './controller';

const app = new Koa();

app.use(koaStatic(path.join(__dirname, 'public')));

app.use(koaBodyparser());

const router = new Router();

router.get('/subscribe', subscribeGet);

router.post('/publish', publishPost);

app.use(router.routes());

export { app, router };

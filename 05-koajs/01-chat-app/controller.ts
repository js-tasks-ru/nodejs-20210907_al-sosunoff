import { ExtendableContext } from 'koa';
import { router } from './app';

let clients: Array<ExtendableContext['res']> = [];

export const subscribeGet: Parameters<typeof router.get>['2'] = async (ctx) => {
  clients.push(ctx.res);
  await new Promise(() => {});
};

export const publishPost: Parameters<typeof router.post>['2'] = async (ctx) => {
  const { message } = ctx.request.body;

  clients.forEach((res) => {
    res.statusCode = 200;
    res.end(message);
  });

  clients = [];

  ctx.res.statusCode = 200;
};

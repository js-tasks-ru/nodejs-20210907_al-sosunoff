import { ExtendableContext } from 'koa';
import { router } from './app';

let clients: Array<(message: string) => void> = [];

const sendMessageAllUser = (message: string) => {
  if (!message) return;
  
  
  clients.forEach((res) => {
    res(message);
  });

  clients = [];
}

export const subscribeGet: Parameters<typeof router.get>['2'] = async (ctx) => {
  const message = await new Promise<string>((res) => {
    clients.push(res);
  });

  ctx.res.statusCode = 200;

  ctx.res.end(message);
};

export const publishPost: Parameters<typeof router.post>['2'] = async (ctx) => {
  const { message } = ctx.request.body;

  sendMessageAllUser(message);

  ctx.res.statusCode = 200;
};

import fs from 'fs';
import path from 'path';
import { app } from '../app';

// this for HTML5 history in browser
const index = fs.readFileSync(path.join(__dirname, '../public/index.html'));

export const indexMiddleware: Parameters<typeof app.use>['0'] = async (
  ctx,
  next
) => {
  if (ctx.url.startsWith('/api') || ctx.method !== 'GET') return;

  ctx.set('content-type', 'text/html');

  ctx.body = index;
};

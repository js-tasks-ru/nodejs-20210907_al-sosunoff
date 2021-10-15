import { app } from '../app';

export const catchErrorMiddleware: Parameters<typeof app.use>['0'] = async (ctx, next) => {
    try {
      await next();
    } catch (err: any) {
      if (err.status) {
        ctx.status = err.status;
        ctx.body = { error: err.message };
      } else {
        console.error(err);
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
      }
    }
  };
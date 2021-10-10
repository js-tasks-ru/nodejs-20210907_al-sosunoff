import { router } from '../app';

export const me: Parameters<typeof router.get>['2'] = async (ctx, next) => {
  if (ctx.user) {
    ctx.body = ctx.user;
  } else {
    ctx.status = 401;
  }
};

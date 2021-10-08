import { router } from '../app';

export const me: Parameters<typeof router.get>['2'] = async (ctx, next) => {
  ctx.body = {
    email: ctx.user.email,
    displayName: ctx.user.displayName,
  };
};

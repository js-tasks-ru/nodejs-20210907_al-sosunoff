import { router } from '../app';

export const mustBeAuthenticated: Parameters<typeof router.get>['2'] = (
  ctx,
  next
) => {
  if (!ctx.user) {
    ctx.throw(401, 'Пользователь не залогинен');
  }

  return next();
};

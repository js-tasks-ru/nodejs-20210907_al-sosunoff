import { router } from '../app';

export const getTokenFromAuthorization: Parameters<typeof router.use>['1'] = (
  ctx,
  next
) => {
  const header = ctx.request.get('Authorization');

  const [, token] = header.split(' ');

  if (!token) {
    ctx.status = 401;

    ctx.body = {
      error: 'Пользователь не залогинен',
    };

    return;
  }

  ctx.token = token;

  return next();
};

import { v4 as uuid } from 'uuid';
import { app } from '../app';

export const loginMiddleware: Parameters<typeof app.use>['0'] = async (
  ctx,
  next
) => {
  ctx.login = async (user) => {
    const token = uuid();

    console.log(user);

    return token;
  };

  return next();
};

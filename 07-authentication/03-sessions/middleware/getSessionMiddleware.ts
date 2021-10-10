import {router} from '../app';
import { Session } from '../models/Session';;

export const getSessionMiddleware: Parameters<typeof router.use>['1'] = async (
  ctx,
  next
) => {
  const session = await Session.findOne({ token: ctx.token }).populate('user');

  if (!session) {
    ctx.status = 401;

    ctx.body = {
      error: 'Неверный аутентификационный токен',
    };

    return;
  }

  ctx.sessionDocument = session;

  return next();
};

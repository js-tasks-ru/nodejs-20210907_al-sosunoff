import jwt, {JwtPayload} from 'jsonwebtoken';
import { Error } from 'mongoose';

import { router } from '../app';
import { secretOrPrivateKey } from '../constants';

export const getSessionMiddleware: Parameters<typeof router.use>['1'] = async (
  ctx,
  next
) => {
  const user = jwt.decode(ctx.token);

  try {
    if(!jwt.verify(ctx.token, secretOrPrivateKey)) throw new Error("");

    if(!user) throw new Error("");
    
  } catch (err) {
    ctx.status = 401;
  
    ctx.body = {
      error: 'Неверный аутентификационный токен',
    };

    return;
  }
  

  /* const session = await Session.findOne({ token: ctx.token }).populate('user');

  if (!session) {
    ctx.status = 401;

    ctx.body = {
      error: 'Неверный аутентификационный токен',
    };

    return;
  } */

  ctx.user = {
    email: (user as JwtPayload).email,
    displayName: (user as JwtPayload).displayName };

  return next();
};

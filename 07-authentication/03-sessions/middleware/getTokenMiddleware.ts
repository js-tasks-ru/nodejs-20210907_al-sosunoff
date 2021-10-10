import { v4 as uuid } from 'uuid';
import { Session } from '../models/Session';
import { app } from '../app';

export const getTokenMiddleware: Parameters<typeof app.use>['0'] = async (
  ctx,
  next
) => {
  ctx.login = async (user) => {
    const token = uuid();

    const session = new Session({
      token,
      user: user._id,
      lastVisit: new Date(),
    });

    await session.save();

    return token;
  };

  return next();
};

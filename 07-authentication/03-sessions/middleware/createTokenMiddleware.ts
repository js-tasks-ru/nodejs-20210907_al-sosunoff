import { UserDocument } from '../models/User/interfaces';
import { v4 as uuid } from 'uuid';
import { Session } from '../models/Session';
import { app } from '../app';
import { Error } from 'mongoose';

export const createTokenMiddleware: Parameters<typeof app.use>['0'] = async (
  ctx,
  next
) => {
  ctx.createTokenMiddleware = (user: UserDocument) => new Promise<string>(async (res) => {
    while (true) {
      try {
        const session = new Session({
          token: uuid(),
          user: user._id,
          lastVisit: new Date(),
        });
  
        await session.save();
  
        res(session.token);
      } catch (err) {
        if (err instanceof Error.ValidationError) {
          if ('token' in err.errors && (err.errors.token as any).kind === 'unique') {
            // repeat create session
          } else {
            throw err;
          }
        } else {
          throw err;
        }
      }
    }
  });

  return next();
};

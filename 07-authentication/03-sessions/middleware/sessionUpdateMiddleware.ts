import {router} from '../app';
import { Session } from '../models/Session';
import { User } from '../models/User';
import { UserDocument } from '../models/User/interfaces';
import { mapUser } from '../models/User/mapUser';

export const sessionUpdateMiddleware: Parameters<typeof router.use>['1'] = async (ctx, next) => {
    if(ctx.sessionDocument.user instanceof User) {
      ctx.sessionDocument.lastVisit = new Date();

      await ctx.sessionDocument.save();

      ctx.user = mapUser(ctx.sessionDocument.user as UserDocument);
    }
  
    return next();
  };
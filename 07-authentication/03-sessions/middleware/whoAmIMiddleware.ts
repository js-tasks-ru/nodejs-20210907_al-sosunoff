import {router} from '../app';
import { Session } from '../models/Session';
import { User } from '../models/User';
import { UserDocument } from '../models/User/interfaces';
import { mapUser } from '../models/User/mapUser';

export const whoAmIMiddleware: Parameters<typeof router.use>['1'] = async (ctx, next) => {
    const header = ctx.request.get('Authorization');
  
    const [, token] = header.split(' ');
  
    if(!token) return next();
  
    const session = await Session.findOne({ token }).populate('user');
  
    if(!session) return next();
  
    if(session.user instanceof User) {
      ctx.user = mapUser(session.user as UserDocument);
    }
  
    return next();
  };
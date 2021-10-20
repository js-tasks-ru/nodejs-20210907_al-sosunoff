import jwt, { JwtPayload } from 'jsonwebtoken';
import { router } from '../app';
import { config } from '../config';
import { Session } from '../models/Session';
import { User } from '../models/User';
import { checkToken } from '../utils/checkToken';

const getTokenFromAuthorizationMiddleware: Parameters<typeof router.use>['1'] = (
    ctx,
    next
  ) => {
    const header = ctx.request.get('Authorization');
    if (!header) return next();
  
    const [, token] = header.split(' ');
    if (!token) return next();
  
    ctx.token = token;
  
    return next();
  };
  
const getUserFromTokenMiddleware: Parameters<typeof router.use>['1'] = (
    ctx,
    next
  ) => {
    if(!ctx.token) return next();
  
    try {
      ctx.user = checkToken(ctx.token);      
    } catch (err) {
      ctx.throw(401, 'Неверный аутентификационный токен');
      return;
    }
  
    return next();
  };
  
const sessionUpdateLastVisitMiddleware: Parameters<typeof router.use>['1'] = async (
    ctx,
    next
  ) => {
    if(!ctx.user) return next();
  
    const user = await User.findOne({
      email: ctx.user.email
    });
  
    if(!user) throw new Error("Not found user");
  
    const filter = { user: user._id } as any;
  
    const update = { lastVisit: new Date() };
  
    await Session.findOneAndUpdate(filter, update);
    
    return next();
  };

export const authMiddleware: Parameters<typeof router.use>['1'][] = [
    getTokenFromAuthorizationMiddleware,
    getUserFromTokenMiddleware,
    sessionUpdateLastVisitMiddleware];
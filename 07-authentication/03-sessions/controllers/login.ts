import { v4 as uuid } from 'uuid';
import { passport } from '../libs/passport';
import { router } from '../app';
import { UserDocument } from '../models/User/interfaces';

export const login: Parameters<typeof router.post>['2'] = async (ctx, next) => {
  await passport.authenticate(
    'local',
    async (err, user: UserDocument, info) => {
      if (err) throw err;

      if (!user) {
        ctx.status = 400;
        ctx.body = { error: info.message };
        return;
      }

      const token = await ctx.createTokenMiddleware(user);

      ctx.body = { token };
    }
  )(ctx, next);
};

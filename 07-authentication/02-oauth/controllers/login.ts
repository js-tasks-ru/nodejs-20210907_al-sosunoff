import { v4 as uuid } from 'uuid';
import { passport } from '../libs/passport';
import { router } from '../app';

export const login: Parameters<typeof router.post>['2'] = async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info.message };
      return;
    }

    const token = uuid();

    ctx.body = { token };
  })(ctx, next);
};

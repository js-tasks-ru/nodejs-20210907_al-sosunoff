import { router } from '../app';
import { Session } from '../models/Session';
import { User } from '../models/User';

export const sessionUpdateMiddleware: Parameters<typeof router.use>['1'] =
  async (ctx, next) => {
    const user = await User.findOne({
      email: ctx.user.email
    });
    const filter = { user: user?._id } as any;

    const update = { lastVisit: new Date() };

    await Session.findOneAndUpdate(filter, update);

    return next();
  };

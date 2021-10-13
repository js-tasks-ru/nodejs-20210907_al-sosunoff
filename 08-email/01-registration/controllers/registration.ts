import { v4 as uuid } from 'uuid';
import { router } from '../app';
import { User } from '../models/User';
import { sendMail } from '../libs/sendMail';

export const register: Parameters<typeof router.post>['2'] = async (
  ctx,
  next
) => {
  const { email, displayName, password } = ctx.request.body;
  if (!email) ctx.throw(400, 'Пользователь не указал email');

  const verificationToken = uuid();

  const user = new User({ email, displayName, verificationToken });
  await user.setPassword(password);
  await user.save();

  sendMail({
    subject: 'Подтверждение email',
    template: 'confirmation',
    locals: {
      token: user.verificationToken,
    },
    to: user.email,
  });

  ctx.body = {
    status: 'ok',
  };
};

export const confirm: Parameters<typeof router.post>['2'] = async (
  ctx,
  next
) => {
  const { verificationToken } = ctx.request.body;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      error: 'Ссылка подтверждения недействительна или устарела',
    };
    return;
  }

  await user.update({ $unset: { verificationToken: 1 } });

  const token = await ctx.createTokenMiddleware(user);

  ctx.body = { token };
};

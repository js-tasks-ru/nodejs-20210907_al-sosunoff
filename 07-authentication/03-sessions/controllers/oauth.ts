import { v4 as uuid } from 'uuid';
import { passport } from '../libs/passport';
import { router } from '../app';
import { config } from '../config';

export type Provider = keyof typeof config['providers']

export const oauth: Parameters<typeof router.get>['2'] = async (ctx, next) => {
  const provider = ctx.params.provider as Provider;

  await passport.authenticate(provider, config.providers[provider].options)(
    ctx,
    next
  );

  const location = ctx.response.get('location');

  ctx.status = 200;
  ctx.body = { status: 'ok', location };
  ctx.response.remove('location');
};

export const oauthCallback: Parameters<typeof router.post>['2'] = async (ctx, next) => {
  const provider = ctx.request.body.provider as Provider;

  await passport.authenticate(provider, async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info.message };
      return;
    }

    const token = await ctx.getToken(user);

    ctx.body = { token };
  })(ctx, next);
};

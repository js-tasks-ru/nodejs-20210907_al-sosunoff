import { KoaPassport } from 'koa-passport';
import { localStrategy } from './strategies/local';
import { facebookStrategy } from './strategies/facebook';
import { vkontakteStrategy } from './strategies/vkontakte';
import { githubStrategy } from './strategies/github';

const passport = new KoaPassport();

passport.use(localStrategy);
passport.use(facebookStrategy);
passport.use(vkontakteStrategy);
passport.use(githubStrategy);

export { passport };

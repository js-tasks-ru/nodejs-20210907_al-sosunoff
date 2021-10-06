import { KoaPassport } from 'koa-passport';
import { localStrategy } from './strategies/local';

const passport = new KoaPassport();

passport.use(localStrategy);

module.exports = passport;

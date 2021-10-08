import { Strategy as GithubStrategy } from 'passport-github';
import { config } from '../../config';
import get from 'lodash/get';
import { authenticate } from './authenticate';

export const githubStrategy = new GithubStrategy(
  {
    clientID: config.providers.github.app_id,
    clientSecret: config.providers.github.app_secret,
    callbackURL: config.providers.github.callback_uri,
    scope: ['user:email'],
    // session: false,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      if (!profile.emails || !profile.emails.length)
        return done(null, false, {
          message: 'У пользователя нет email',
        });
        
      const [{ value: email }] = profile.emails;

      await authenticate('github', email, profile.displayName, done);
    } catch (err: any) {
      done(err);
    }
  }
);

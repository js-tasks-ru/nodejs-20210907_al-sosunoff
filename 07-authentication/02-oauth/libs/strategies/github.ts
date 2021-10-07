import { Strategy as GithubStrategy } from 'passport-github';
import { config } from '../../config';
import get from 'lodash/get';

export const githubStrategy = new GithubStrategy(
  {
    clientID: config.providers.github.app_id,
    clientSecret: config.providers.github.app_secret,
    callbackURL: config.providers.github.callback_uri,
    scope: ['user:email'],
    // session: false,
  },
  function (accessToken, refreshToken, profile, done) {
    done(null, false, {
      message: 'функция аутентификации с помощью github не настроена',
    });

    /* authenticate(
      'github',
      get(profile, 'emails[0].value'),
      profile.username,
      done
    ); */
  }
);

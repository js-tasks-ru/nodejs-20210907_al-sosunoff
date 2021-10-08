import { Strategy as FacebookStrategy } from 'passport-facebook';
import { config } from '../../config';
import get from 'lodash/get';

export const facebookStrategy = new FacebookStrategy(
  {
    clientID: config.providers.facebook.app_id,
    clientSecret: config.providers.facebook.app_secret,
    callbackURL: config.providers.facebook.callback_uri,
    profileFields: ['displayName', 'email'],
    // session: false,
  },
  function (accessToken, refreshToken, profile, done) {
    done(null, false, {
      message: 'функция аутентификации с помощью facebook не настроена',
    });

    /* authenticate(
      'facebook',
      get(profile, 'emails[0].value'),
      profile.displayName,
      done
    ); */
  }
);

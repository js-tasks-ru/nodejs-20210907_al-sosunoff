import { Strategy as VkontakteStrategy } from 'passport-vkontakte';
import { config } from '../../config';
import { authenticate } from './authenticate';

export const vkontakteStrategy = new VkontakteStrategy(
  {
    clientID: config.providers.vkontakte.app_id,
    clientSecret: config.providers.vkontakte.app_secret,
    callbackURL: config.providers.vkontakte.callback_uri,
    apiVersion: '5.110',
    // scope: ['user:email'],
    // session: false,
  },
  async (accessToken, refreshToken, params, profile, done) => {
    try {
      if (!profile.emails || !profile.emails.length)
        return done(null, false, {
          message: 'У пользователя нет email',
        });

      const [{ value: email }] = profile.emails;

      await authenticate('vkontakte', email, profile.displayName, done);
    } catch (err) {
      done(err);
    }
  }
);

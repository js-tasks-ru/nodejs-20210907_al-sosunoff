import { Strategy as VkontakteStrategy } from 'passport-vkontakte';
import { config } from '../../config';

export const vkontakteStrategy = new VkontakteStrategy(
  {
    clientID: config.providers.vkontakte.app_id,
    clientSecret: config.providers.vkontakte.app_secret,
    callbackURL: config.providers.vkontakte.callback_uri,
    apiVersion: '5.110',
    // scope: ['user:email'],
    // session: false,
  },
  function (accessToken, refreshToken, params, profile, done) {
    done(null, false, {
      message: 'функция аутентификации с помощью vkontakte не настроена',
    });
    
    /* authenticate('vkontakte', params.email, profile.displayName, done); */
  }
);

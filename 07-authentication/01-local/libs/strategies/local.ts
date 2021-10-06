import { Strategy as LocalStrategy } from 'passport-local';

export const localStrategy = new LocalStrategy(
  { usernameField: 'email', session: false },
  function (email, password, done) {
    // 
    done(null, false, {
      message: 'Стратегия подключена, но еще не настроена',
    });
  }
);

import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../models/User';

export const localStrategy = new LocalStrategy(
  { usernameField: 'email', session: false },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, {
          message: 'Нет такого пользователя',
        });
      }

      const isValidPassword = await user.checkPassword(password);

      if (!isValidPassword) {
        return done(null, false, {
          message: 'Неверный пароль',
        });
      }

      if (user.verificationToken) {
        return done(null, false, { message: 'Подтвердите email' });
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

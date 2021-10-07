import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../models/User';

export const localStrategy = new LocalStrategy(
  { usernameField: 'email', session: false },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, null, {
          message: 'Нет такого пользователя',
        });
      }

      const checkPassword = await user.checkPassword(password);

      if (!checkPassword) {
        return done(null, null, {
          message: 'Неверный пароль',
        });
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

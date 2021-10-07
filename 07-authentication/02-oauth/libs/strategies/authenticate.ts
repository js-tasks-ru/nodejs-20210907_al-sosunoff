import { User } from '../../models/User';

export const authenticate = async (
  strategy: string,
  email: string,
  displayName: string,
  done: (err?: any, user?: any, info?: any) => void
) => {
  try {
    done(
      null,
      false,
      `функция аутентификации с помощью ${strategy} не настроена`
    );
  } catch (err) {
    done(err);
  }
};

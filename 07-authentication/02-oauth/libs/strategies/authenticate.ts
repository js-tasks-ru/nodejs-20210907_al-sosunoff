import { Provider } from '../../controllers/oauth';
import { User } from '../../models/User';

export const authenticate = async (
  strategy: Provider,
  email: string,
  displayName: string,
  done: (err?: any, user?: any, info?: any) => void
) => {
  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        displayName,
      });

      await user.save();
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
};

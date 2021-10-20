import { UserDocument } from './interfaces';

export const mapUser = (user: UserDocument) => ({
  email: user.email,
  displayName: user.displayName,
});

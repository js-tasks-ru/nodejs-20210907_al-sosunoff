import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';

export const checkToken = (
  token: string
): {
  email: string,
  displayName: string,
} => {
    const user = jwt.decode(token);

    if (!jwt.verify(token, config.crypto.secretOrPrivateKey)) throw new Error('');

    if (!user) throw new Error('');

    return {
        email: (user as JwtPayload).email,
        displayName: (user as JwtPayload).displayName
    };
};

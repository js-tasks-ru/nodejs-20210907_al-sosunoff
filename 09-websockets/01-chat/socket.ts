import { Server } from 'socket.io';
import http from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { Session } from './models/Session';
import { Message } from './models/Message';
import { User } from './models/User';
import { checkToken } from './utils/checkToken';

declare module 'socket.io' {
  interface Socket {
      user: {
        email: string,
        displayName: string,
      };
  }
}

export const socket = (server: http.Server) => {
  const io = new Server(server);

  io.use(async function (socket, next) {
    const token = socket.handshake.query.token as string;

    if (!token) return next(new Error('anonymous sessions are not allowed'));

    const session = await Session.findOne({ token });

    if(!session) return next(new Error("wrong or expired session token"));

    try {
      socket.user = checkToken(token);
    } catch (err) {
      throw new Error('anonymous sessions are not allowed');
    }
    
    next();
  });

  io.on('connection', function (socket) {
    socket.on('message', async (msg) => {
      const user = await User.findOne({ email: socket.user.email });
      
      if(!user) return;

      await Message.create({
        user: socket.user.displayName,
        chat: user,
        text: msg,
        date: new Date(),
      });
    });
  });

  return io;
};

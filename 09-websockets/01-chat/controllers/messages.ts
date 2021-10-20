import { router } from '../app';
import { mapMessage } from '../mappers/message';
import { Message } from '../models/Message';
import { User } from '../models/User';

export const messageList: Parameters<typeof router.get>['2'] = async (
  ctx,
  next
) => {
  const user = await User.findOne({ email: ctx.user.email });
  if (!user) return ctx.throw(404, 'Пользователь не найден');

  const messages = await Message.find({ chat: user._id }).limit(20);

  ctx.status = 200;
  ctx.body = {
    messages: messages.map(mapMessage),
  };
};

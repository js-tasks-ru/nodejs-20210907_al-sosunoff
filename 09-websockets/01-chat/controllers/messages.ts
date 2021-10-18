import { router } from '../app';
import { Message } from '../models/Message';

export const messageList: Parameters<typeof router.get>['2'] = async (
  ctx,
  next
) => {
  ctx.body = {};
};

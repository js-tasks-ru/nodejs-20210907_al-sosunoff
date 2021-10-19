import { MessageDocument } from '../models/Message/interfaces';
import { mapProduct } from './product';

export const mapMessage = (message: MessageDocument) => ({
  id: message._id,
  user: message.user,
  date: message.date,
  text: message.text,
});

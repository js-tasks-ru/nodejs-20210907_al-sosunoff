import { Model, Schema, Document } from 'mongoose';

export interface MessageSchema {
  user: string;
  chat: Schema.Types.ObjectId;
  text: string;
  date: Date;
}

export interface MessageDocument extends MessageSchema, Document {}

export interface MessageModel extends Model<MessageDocument> {}

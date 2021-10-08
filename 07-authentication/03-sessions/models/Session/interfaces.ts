import { Model, Document, Schema } from 'mongoose';

export interface SessionSchema {
  token: string;
  lastVisit: Date;
  user: Schema.Types.ObjectId;
}

export interface SessionDocument extends SessionSchema, Document {}

export interface SessionModel extends Model<SessionDocument> {}

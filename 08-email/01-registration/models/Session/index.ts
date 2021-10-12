import { SessionDocument, SessionModel, SessionSchema } from './interfaces';
import { connection } from '../../libs/connection';
import { Schema } from 'mongoose';

const schema = new Schema<SessionDocument, SessionModel, SessionSchema>({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  lastVisit: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

schema.path('lastVisit').index({ expires: '7d' });

export const Session = connection.model<SessionDocument, SessionModel>('Session', schema);
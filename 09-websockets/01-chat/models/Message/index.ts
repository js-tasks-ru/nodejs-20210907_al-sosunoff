import { Schema } from 'mongoose';
import { connection } from '../../libs/connection';
import { MessageDocument, MessageModel, MessageSchema } from './interfaces';

const messageSchema = new Schema<MessageDocument, MessageModel, MessageSchema>({
    user: {
        type: String,
        required: true,
    },

    chat: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },
    
    date: {
        type: Date,
        required: true,
    },
});

export const Message = connection.model<MessageDocument, MessageModel>('Message', messageSchema);

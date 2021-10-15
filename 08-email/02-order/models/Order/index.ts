import { Schema } from 'mongoose';
import { connection } from '../../libs/connection';
import { OrderDocument, OrderModel, OrderSchema } from './interfaces';

const orderSchema = new Schema<OrderDocument, OrderModel, OrderSchema>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },

    phone: {
        type: String,
        required: true,
        validate: [
            {
                validator(value: string) {
                    return /\+?\d{6,14}/.test(value);
                },
                message: 'Неверный формат номера телефона.',
            },
        ],
    },
  
    address: {
        type: String,
        required: true,
    },
});

export const Order = connection.model<OrderDocument, OrderModel>('Order', orderSchema);

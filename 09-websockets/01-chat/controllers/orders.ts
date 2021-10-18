import { Types } from 'mongoose';

import { mapProduct } from './../mappers/product';
import { Product } from './../models/Product';
import { router } from '../app';
import { Order } from '../models/Order';
import { sendMail } from '../libs/sendMail';
import { User } from '../models/User';
import { OrderDocument } from '../models/Order/interfaces';
import { ProductDocument } from '../models/Product/interfaces';

export const checkout: Parameters<typeof router.post>['2'] =
  async function checkout(ctx, next) {
    const errors: Record<string, string> = {};

    const { product: productId, phone, address } = ctx.request.body;

    const user = await User.findOne({ email: ctx.user.email });
    if (!user) return ctx.throw(404, 'Пользователь не найден');

    const product = await Product.findById(Types.ObjectId(productId));

    if (!product) {
      errors.product = 'required';
    }

    let order: OrderDocument | null = null;

    try {
        order = await Order.create({
            user: user._id,
            product: Types.ObjectId(productId),
            phone,
            address,
        });

        if (!order) {
            errors.order = 'required';
        }
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            Object.entries<any>(err.errors).forEach(([key, config]) => {
                errors[key] = config.kind === 'user defined' 
                    ? config.message 
                    : config.kind === 'required' 
                        ? 'required' 
                        : config.message;
            });
        } else {
            throw err;
        }
    }

    if (Object.keys(errors).length) {
        ctx.status = 400;
        ctx.body = {
          errors,
        };
        return;
    }

    await sendMail({
        subject: 'Подтверждение заказа',
        template: 'order-confirmation',
        locals: {
            id: (order as OrderDocument)._id,
            product: mapProduct(product as ProductDocument),
        },
        to: user.email,
    });

    ctx.body = {
        order: (order as OrderDocument)._id,
    };
  };

export const getOrdersList: Parameters<typeof router.get>['2'] =
  async function ordersList(ctx, next) {
    const user = await User.findOne({ email: ctx.user.email });
    if (!user) return ctx.throw(404, 'Пользователь не найден');
    
    const orders = await Order.find({ user: user._id });

    ctx.status = 200;
    ctx.body = {
        orders
    }
  };

import { router } from '../app';
import { Order } from '../models/Order';
import { sendMail } from '../libs/sendMail';

export const checkout: Parameters<typeof router.post>['2'] =
  async function checkout(ctx, next) {};

export const getOrdersList: Parameters<typeof router.get>['2'] =
  async function ordersList(ctx, next) {};

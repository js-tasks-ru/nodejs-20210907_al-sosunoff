import { mapProduct } from './product';
import { OrderDocument } from '../models/Order/interfaces';
import { ProductDocument } from '../models/Product/interfaces';

export const mapOrder = (order: OrderDocument) => ({
  id: order.id,
  user: order.user,
  product: mapProduct(order.product as ProductDocument),
  phone: order.phone,
  address: order.address,
});

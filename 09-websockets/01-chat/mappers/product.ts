import { ProductDocument } from '../models/Product/interfaces';

export const mapProduct = (product: ProductDocument) => ({
  id: product.id,
  title: product.title,
  images: product.images,
  category: product.category,
  subcategory: product.subcategory,
  price: product.price,
  description: product.description,
});

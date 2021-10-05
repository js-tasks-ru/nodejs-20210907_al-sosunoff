import { IProductDocument } from '../../models/Product';

export const mapProducts = (docs: IProductDocument[]) =>
  docs.map(({ _id, title, images, category, subcategory, price, description }) => ({
    id: _id,
    title,
    images,
    category: `${category}`,
    subcategory: `${subcategory}`,
    price,
    description
  }));

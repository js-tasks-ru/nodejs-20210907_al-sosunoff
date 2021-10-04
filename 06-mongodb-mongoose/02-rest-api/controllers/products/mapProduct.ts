import { IProductDocument } from '../../models/Product';
import { mapProducts } from './mapProducts';

export const mapProduct = (doc: IProductDocument) => mapProducts([doc])[0];

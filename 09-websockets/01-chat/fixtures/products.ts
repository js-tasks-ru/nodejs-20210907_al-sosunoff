const data = require('./data/products.json');

export const products = data.map((product) => ({
  ...product,
  price: parseInt(product.price),
  description: product.description.replace(/(<([^>]+)>)/gi, ''),
  rating: Math.floor(Math.random() * 2) + 3,
}));

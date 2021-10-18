import data from './data/categories.json';

export const categories = Object.keys(data).map((category) => ({
  title: category,
  subcategories: data[category].map((subcategory) => ({
    title: subcategory,
  })),
}));

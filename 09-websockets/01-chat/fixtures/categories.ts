import data from './data/categories.json';

export const categories = Object.entries(data).reduce<{
  title: string,
  subcategories: {
    title: string,
  }[]
}[]>(
  (res, [category, value]) => [
    ...res,
    {
      title: category,
      subcategories: value.map((subcategory) => ({
        title: subcategory,
      })),
    },
  ],
  []
);

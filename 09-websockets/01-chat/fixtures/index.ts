import { User } from '../models/User';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { connection } from '../libs/connection';

import { users } from './users';
import { categories } from './categories';
import { products } from './products';

(async () => {
  await User.deleteMany();
  await Category.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();

  for (const user of users) {
    const u = new User(user);
    await u.setPassword(user.password);
    await u.save();
  }

  const categoriesMap: {
    [title: string]: {
      id: string,
      subcategories: {
        [title: string]: string,
      },
    },
  } = {};

  for (const category of categories) {
    const c = await Category.create(category);

    categoriesMap[category.title] = {
      id: c.id,
      subcategories: c.subcategories.reduce(
        (r, s) => ({
          ...r,
          [s.title]: s.id,
        }),
        {}
      ),
    };
  }

  for (const product of products) {
    await Product.create({
      title: product.title,
      description: product.description,
      price: product.price,
      rating: product.rating,
      category: categoriesMap[product.category].id,
      subcategory:
        categoriesMap[product.category].subcategories[product.subcategory],
      images: product.images,
    });
  }

  connection.close();

  console.log(`${users.length} users have been saved in DB`);
  console.log(`${categories.length} categories have been saved in DB`);
  console.log(`${products.length} products have been saved in DB`);
})();

import { CategoriesTable } from './categoriesSchema';
import { ProductsInventoryTable } from './productsInventorySchema';
import { ProductsTable } from './productsSchema';
import { UsersTable } from './usersSchema';

export interface Database {
  products: ProductsTable;
  products_inventory: ProductsInventoryTable;
  categories: CategoriesTable;
  users: UsersTable;
}

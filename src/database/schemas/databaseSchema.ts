import { ProductInventoryTable } from './productsInventorySchema';
import { ProductsTable } from './productsSchema';

export interface Database {
  products: ProductsTable;
  products_inventory: ProductInventoryTable;
}

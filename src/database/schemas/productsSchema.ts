import { Generated } from 'kysely';

export interface ProductsTable {
  id: Generated<string>;
  name: string;
  description: string;
  price: number;
  sku: string;
  category_id: string;
  inventory_id: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  deleted_at: Generated<Date>;
}

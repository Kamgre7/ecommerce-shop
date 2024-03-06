import { Generated } from 'kysely';

export interface ProductsInventoryTable {
  id: Generated<string>;
  quantity: number;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

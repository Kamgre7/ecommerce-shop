import { Generated } from 'kysely';

export interface CategoriesTable {
  id: Generated<string>;
  name: string;
  description: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  deleted_at: Generated<Date> | null;
}

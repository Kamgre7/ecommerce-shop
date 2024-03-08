export interface CategoryDb {
  name: string;
  description: string;
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

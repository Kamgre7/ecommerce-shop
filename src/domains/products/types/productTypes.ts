export interface ProductDb {
  name: string;
  description: string;
  price: number;
  sku: string;
  id: string;
  created_at: Date;
  updated_at: Date;
  category_id: string;
  inventory_id: string;
  deleted_at: Date | null;
}

export interface ProductInventoryDb {
  id: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

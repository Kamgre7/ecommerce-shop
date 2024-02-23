import { Exclude } from 'class-transformer';

export interface IProductInventory {
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductInventory implements IProductInventory {
  id: string;
  quantity: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

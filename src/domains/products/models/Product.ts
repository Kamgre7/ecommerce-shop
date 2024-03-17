import { Exclude, Type } from 'class-transformer';
import { Category, ICategory } from '../../categories/models/Category';
import { IProductInventory, ProductInventory } from './ProductInventory';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  category: ICategory | null;
  inventory: IProductInventory | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Product implements IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;

  @Type(() => Category)
  category: ICategory | null = null;

  @Type(() => ProductInventory)
  inventory: IProductInventory | null = null;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;
}

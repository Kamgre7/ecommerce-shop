import { Exclude } from 'class-transformer';

export interface ICategory {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Category implements ICategory {
  id: string;
  name: string;

  @Exclude()
  description: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;
}

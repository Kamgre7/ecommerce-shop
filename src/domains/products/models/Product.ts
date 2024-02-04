export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  categoryId: string;
  inventoryId: string;
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
  categoryId: string;
  inventoryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(productInfo: IProduct) {
    this.id = productInfo.id;
    this.name = productInfo.name;
    this.description = productInfo.description;
    this.price = productInfo.price;
    this.sku = productInfo.sku;
    this.categoryId = productInfo.categoryId;
    this.inventoryId = productInfo.inventoryId;
    this.createdAt = productInfo.createdAt;
    this.deletedAt = productInfo.deletedAt;
    this.updatedAt = productInfo.updatedAt;
  }
}

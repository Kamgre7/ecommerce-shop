export interface IProductInventory {
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductInventory implements IProductInventory {
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(productInventoryInfo: IProductInventory) {
    this.id = productInventoryInfo.id;
    this.quantity = productInventoryInfo.quantity;
    this.createdAt = productInventoryInfo.createdAt;
    this.updatedAt = productInventoryInfo.updatedAt;
  }
}

import { injectable } from 'inversify';
import { database } from '../../../database/database';

export interface IProductsInventoryRepository {
  changeQuantityBy(inventoryId: string, value: number): Promise<void>;
  validateQuantity(inventoryId: string, value: number): Promise<boolean>;
}

@injectable()
export class ProductsInventoryRepository implements IProductsInventoryRepository {
  private readonly productsInventoryTable = 'products_inventory';

  constructor(private readonly db = database) {}

  async changeQuantityBy(inventoryId: string, value: number): Promise<void> {
    await this.db
      .updateTable(this.productsInventoryTable)
      .set((eb) => ({
        quantity: eb('quantity', '+', value),
      }))
      .where('id', '=', inventoryId)
      .executeTakeFirstOrThrow();
  }

  async validateQuantity(inventoryId: string, value: number): Promise<boolean> {
    const productInventory = await this.db
      .selectFrom(this.productsInventoryTable)
      .where('id', '=', inventoryId)
      .select('quantity')
      .executeTakeFirst();

    if (!productInventory) {
      return false;
    }

    return productInventory.quantity + value >= 0;
  }
}

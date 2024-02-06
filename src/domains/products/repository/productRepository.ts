import { inject, injectable } from 'inversify';
import { database } from '../../../database/database';
import { NewProduct } from '../schemas/createProductValidationSchema';
import { ProductDb } from '../types/productTypes';
import { IProduct, Product } from '../models/Product';
import { TYPES } from '../../../ioc/types/types';
import { IErrorMapper } from '../../../errors/errorMapper';

export interface IProductsRepository {
  create(newProduct: NewProduct): Promise<IProduct>;
}

@injectable()
export class ProductsRepository implements IProductsRepository {
  private readonly productsTable = 'products';
  private readonly productsInventoryTable = 'products_inventory';

  constructor(
    @inject(TYPES.ErrorMapperToken)
    private readonly errorMapper: IErrorMapper,
    private readonly db = database,
  ) {}

  async create(newProduct: NewProduct): Promise<IProduct> {
    const { category, quantity, ...productInfo } = newProduct;

    try {
      const product = await this.db
        .with('created_product_inventory', (queryCreator) =>
          queryCreator
            .insertInto(this.productsInventoryTable)
            .values({
              quantity,
            })
            .returningAll(),
        )
        .insertInto(this.productsTable)
        .values((expressionBuilder) => ({
          ...productInfo,
          category_id: category,
          inventory_id: expressionBuilder.selectFrom('created_product_inventory').select('id'),
        }))
        .returningAll()
        .executeTakeFirstOrThrow();

      return this.mapDataFromDb(product);
    } catch (err) {
      throw this.errorMapper.mapRepositoryError(err);
    }
  }

  private mapDataFromDb(product: ProductDb): IProduct {
    const {
      category_id: categoryId,
      inventory_id: inventoryId,
      created_at: createdAt,
      updated_at: updatedAt,
      deleted_at: deletedAt,
      ...rest
    } = product;

    return new Product({
      ...rest,
      categoryId,
      inventoryId,
      createdAt,
      deletedAt,
      updatedAt,
    });
  }
}

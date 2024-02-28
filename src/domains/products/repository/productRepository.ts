import { inject, injectable } from 'inversify';
import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { ExpressionBuilder } from 'kysely';
import { plainToClass } from 'class-transformer';
import { database } from '../../../database/database';
import { NewProduct } from '../schemas/createProductValidationSchema';
import { ProductDb } from '../types/productTypes';
import { IProduct, Product } from '../models/Product';
import { TYPES } from '../../../ioc/types/types';
import { IErrorMapper } from '../../../errors/errorMapper';
import { Database } from '../../../database/schemas/databaseSchema';
import { ProductUpdateData } from '../schemas/updateProductValidationSchema';
import { ProductsCriteria } from '../schemas/findProductByCriteriaValidationSchema';

export interface IProductsRepository {
  create(newProduct: NewProduct): Promise<IProduct>;
  findById(id: string): Promise<IProduct | null>;
  findByCriteria(criteria: ProductsCriteria): Promise<IProduct[]>;
  update(productData: ProductUpdateData, productId: string): Promise<IProduct | null>;
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

      return plainToClass(Product, { ...this.snakeToCamelCase(product) });
    } catch (err) {
      throw this.errorMapper.mapRepositoryError(err);
    }
  }

  async findById(id: string): Promise<IProduct | null> {
    const product = await this.db
      .selectFrom(this.productsTable)
      .where('id', '=', id)
      .selectAll()
      .select((eb) => [this.withInventory(eb), this.withCategory(eb)])
      .executeTakeFirst();

    if (!product) {
      return null;
    }

    const { category, inventory, ...productDb } = product;

    return plainToClass(Product, { ...this.snakeToCamelCase(productDb), category, inventory });
  }

  async findByCriteria(criteria: ProductsCriteria): Promise<IProduct[]> {
    const { name, category, priceFrom, priceTo, sku } = criteria;

    let query = this.db.selectFrom(this.productsTable);

    if (name) query = query.where('name', 'ilike', `%${name}%`);
    if (category) query = query.where('category_id', '=', category);
    if (priceFrom) query = query.where('price', '>=', priceFrom);
    if (priceTo) query = query.where('price', '<=', priceTo);
    if (sku) query = query.where('sku', 'ilike', `%${sku}%`);

    const products = await query
      .selectAll()
      .select((eb) => [this.withInventory(eb), this.withCategory(eb)])
      .distinctOn('id')
      .execute();

    return products.map((product) =>
      plainToClass(Product, {
        ...this.snakeToCamelCase(product),
        category: product.category,
        inventory: product.inventory,
      }),
    );
  }

  async update(productData: ProductUpdateData, productId: string): Promise<IProduct | null> {
    const { category, ...product } = productData;

    try {
      const updatedProduct = await this.db
        .updateTable(this.productsTable)
        .set({ ...product })
        .where('products.id', '=', productId)
        .returningAll()
        .executeTakeFirst();

      if (!updatedProduct) {
        return null;
      }

      return plainToClass(Product, { ...this.snakeToCamelCase(updatedProduct) });
    } catch (err) {
      throw this.errorMapper.mapRepositoryError(err);
    }
  }

  private withInventory(eb: ExpressionBuilder<Database, 'products'>) {
    return jsonObjectFrom(
      eb
        .selectFrom('products_inventory')
        .select([
          'products_inventory.id',
          'products_inventory.quantity',
          'products_inventory.created_at as createdAt',
          'products_inventory.updated_at as updatedAt',
        ])
        .whereRef('products_inventory.id', '=', 'products.inventory_id'),
    ).as('inventory');
  }

  private withCategory(eb: ExpressionBuilder<Database, 'products'>) {
    return jsonObjectFrom(
      eb
        .selectFrom('categories')
        .select([
          'categories.id',
          'categories.name',
          'categories.description',
          'categories.created_at as createdAt',
          'categories.updated_at as updatedAt',
          'categories.deleted_at as deletedAt',
        ])
        .whereRef('categories.id', '=', 'products.category_id'),
    ).as('category');
  }

  private snakeToCamelCase(product: ProductDb) {
    const {
      category_id: category,
      inventory_id: inventory,
      created_at: createdAt,
      updated_at: updatedAt,
      deleted_at: deletedAt,
      ...rest
    } = product;

    return {
      ...rest,
      createdAt,
      deletedAt,
      updatedAt,
    };
  }
}

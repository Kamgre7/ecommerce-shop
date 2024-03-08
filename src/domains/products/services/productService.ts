import { inject, injectable } from 'inversify';
import { NewProduct } from '../schemas/createProductValidationSchema';
import { TYPES } from '../../../ioc/types/types';
import { IProductsRepository } from '../repository/productRepository';
import { IProduct } from '../models/Product';
import { NotFoundError } from '../../../errors/notFoundError';
import { ProductUpdateData } from '../schemas/updateProductValidationSchema';
import { IProductsInventoryRepository } from '../repository/productInventoryRepository';
import { BadRequestError } from '../../../errors/badRequestError';
import { ProductsCriteria } from '../schemas/findProductByCriteriaValidationSchema';
import { ICategoriesRepository } from '../../categories/repository/categoryRepository';

export interface IProductsService {
  create(newProduct: NewProduct): Promise<IProduct>;
  findById(id: string): Promise<IProduct>;
  findByCriteria(criteria: ProductsCriteria): Promise<IProduct[]>;
  update(productData: ProductUpdateData, id: string): Promise<IProduct>;
  softDelete(id: string): Promise<void>;

  updateInventory(inventoryId: string, value: number): Promise<void>;
}

@injectable()
export class ProductsService implements IProductsService {
  constructor(
    @inject(TYPES.ProductsRepositoryToken)
    private readonly productsRepository: IProductsRepository,
    @inject(TYPES.ProductsInventoryRepositoryToken)
    private readonly productsInventoryRepository: IProductsInventoryRepository,
    @inject(TYPES.CategoriesRepositoryToken)
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async create(newProduct: NewProduct): Promise<IProduct> {
    const categoryExist = await this.categoriesRepository.findById(newProduct.category);

    if (!categoryExist) {
      throw new BadRequestError('Category not found');
    }

    const product = await this.productsRepository.create(newProduct);

    return product;
  }

  async findById(id: string): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async findByCriteria(criteria: ProductsCriteria): Promise<IProduct[]> {
    return this.productsRepository.findByCriteria(criteria);
  }

  async update(productData: ProductUpdateData, id: string): Promise<IProduct> {
    const product = await this.productsRepository.update(productData, id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async softDelete(id: string): Promise<void> {
    const isDeleted = await this.productsRepository.softDelete(id);

    if (!isDeleted) {
      throw new NotFoundError('Product not found');
    }
  }

  async updateInventory(inventoryId: string, value: number): Promise<void> {
    const isValid = await this.productsInventoryRepository.validateQuantity(inventoryId, value);

    if (!isValid) {
      throw new BadRequestError('Wrong quantity value');
    }

    await this.productsInventoryRepository.changeQuantityBy(inventoryId, value);
  }
}

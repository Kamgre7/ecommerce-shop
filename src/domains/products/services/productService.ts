import { inject, injectable } from 'inversify';
import { NewProduct } from '../schemas/createProductValidationSchema';
import { TYPES } from '../../../ioc/types/types';
import { IProductsRepository } from '../repository/productRepository';
import { IProduct } from '../models/Product';

export interface IProductsService {
  create(newProduct: NewProduct): Promise<IProduct>;
}

@injectable()
export class ProductsService implements IProductsService {
  constructor(
    @inject(TYPES.ProductsRepositoryToken)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async create(newProduct: NewProduct): Promise<IProduct> {
    return this.productsRepository.create(newProduct);
  }
}

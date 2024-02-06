import { Container } from 'inversify';
import { TYPES } from './types/types';
import { IProductsController, ProductsController } from '../domains/products/controllers/productController';
import { IProductsService, ProductsService } from '../domains/products/services/productService';
import { IProductsRepository, ProductsRepository } from '../domains/products/repository/productRepository';
import { ErrorMapper, IErrorMapper } from '../errors/errorMapper';

export const container = new Container();

// Product
container.bind<IProductsController>(TYPES.ProductsControllerToken).to(ProductsController);
container.bind<IProductsService>(TYPES.ProductsServiceToken).to(ProductsService);
container.bind<IProductsRepository>(TYPES.ProductsRepositoryToken).to(ProductsRepository);

// ErrorMapper
container.bind<IErrorMapper>(TYPES.ErrorMapperToken).to(ErrorMapper);

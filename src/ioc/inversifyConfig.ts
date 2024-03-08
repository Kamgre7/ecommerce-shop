import { Container } from 'inversify';
import { TYPES } from './types/types';
import { IProductsController, ProductsController } from '../domains/products/controllers/productController';
import { IProductsService, ProductsService } from '../domains/products/services/productService';
import { IProductsRepository, ProductsRepository } from '../domains/products/repository/productRepository';
import { ErrorMapper, IErrorMapper } from '../errors/errorMapper';
import {
  IProductsInventoryRepository,
  ProductsInventoryRepository,
} from '../domains/products/repository/productInventoryRepository';
import { CategoriesRepository, ICategoriesRepository } from '../domains/categories/repository/categoryRepository';
import { CategoriesService, ICategoriesService } from '../domains/categories/services/categoryService';
import { CategoryController, ICategoriesController } from '../domains/categories/controllers/categoryController';

export const container = new Container();

// Products
container.bind<IProductsController>(TYPES.ProductsControllerToken).to(ProductsController);
container.bind<IProductsService>(TYPES.ProductsServiceToken).to(ProductsService);
container.bind<IProductsRepository>(TYPES.ProductsRepositoryToken).to(ProductsRepository);

// ProductsInventory
container.bind<IProductsInventoryRepository>(TYPES.ProductsInventoryRepositoryToken).to(ProductsInventoryRepository);

// Categories
container.bind<ICategoriesController>(TYPES.CategoriesControllerToken).to(CategoryController);
container.bind<ICategoriesService>(TYPES.CategoriesServiceToken).to(CategoriesService);
container.bind<ICategoriesRepository>(TYPES.CategoriesRepositoryToken).to(CategoriesRepository);

// ErrorMapper
container.bind<IErrorMapper>(TYPES.ErrorMapperToken).to(ErrorMapper);

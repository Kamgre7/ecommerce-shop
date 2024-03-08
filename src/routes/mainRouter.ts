import { Router } from 'express';
import { productsRouter } from '../domains/products/routes/productRoutes';
import { categoriesRouter } from '../domains/categories/routes/categoryRoutes';

export const mainRouter = Router();

mainRouter.use('/products', productsRouter);
mainRouter.use('/categories', categoriesRouter);

import { Router } from 'express';
import { productsRouter } from '../domains/products/routes/productRoutes';

export const mainRouter = Router();

mainRouter.use('/products', productsRouter);

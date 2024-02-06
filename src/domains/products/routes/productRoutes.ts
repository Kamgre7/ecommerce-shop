import { Router } from 'express';
import { requestValidator } from '../../../middlewares/requestValidator';
import { CreateProductSchema } from '../schemas/createProductValidationSchema';
import { container } from '../../../ioc/inversifyConfig';
import { IProductsController } from '../controllers/productController';
import { TYPES } from '../../../ioc/types/types';

export const productsRouter = Router();

const productsController = container.get<IProductsController>(TYPES.ProductsControllerToken);

productsRouter.route('/').post(requestValidator(CreateProductSchema), productsController.create);

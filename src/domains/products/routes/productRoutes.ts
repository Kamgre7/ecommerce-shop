import { Router } from 'express';
import { requestValidator } from '../../../middlewares/requestValidator';
import { CreateProductSchema } from '../schemas/createProductValidationSchema';
import { container } from '../../../ioc/inversifyConfig';
import { IProductsController } from '../controllers/productController';
import { TYPES } from '../../../ioc/types/types';
import { FindByIdProductSchema } from '../schemas/findProductValidationSchema';
import { UpdateProductSchema } from '../schemas/updateProductValidationSchema';
import { UpdateProductInventorySchema } from '../schemas/updateProductInventoryValidationSchema';
import { FindProductByCriteriaSchema } from '../schemas/findProductByCriteriaValidationSchema';
import { DeleteProductSchema } from '../schemas/deleteProductValidationSchema';

export const productsRouter = Router();

const productsController = container.get<IProductsController>(TYPES.ProductsControllerToken);

productsRouter.route('/').post(requestValidator(CreateProductSchema), productsController.create);

productsRouter.route('/search').get(requestValidator(FindProductByCriteriaSchema), productsController.findByCriteria);

productsRouter
  .route('/inventory/:inventoryId')
  .patch(requestValidator(UpdateProductInventorySchema), productsController.updateInventory);

productsRouter
  .route('/:id')
  .get(requestValidator(FindByIdProductSchema), productsController.findById)
  .patch(requestValidator(UpdateProductSchema), productsController.update)
  .delete(requestValidator(DeleteProductSchema), productsController.delete);

import { Router } from 'express';
import { container } from '../../../ioc/inversifyConfig';
import { requestValidator } from '../../../middlewares/requestValidator';
import { ICategoriesController } from '../controllers/categoryController';
import { TYPES } from '../../../ioc/types/types';
import { CreateCategorySchema } from '../schemas/createCategoryValidationSchema';
import { FindByIdCategorySchema } from '../schemas/findCategoryValidationSchema';
import { UpdateCategorySchema } from '../schemas/updateCategoryValidationSchema';
import { DeleteCategorySchema } from '../schemas/deleteCategoryValidationSchema';
import { FindCategoryByCriteriaSchema } from '../schemas/findByCriteriaCategoryValidationSchema';

export const categoriesRouter = Router();

const categoriesController = container.get<ICategoriesController>(TYPES.CategoriesControllerToken);

categoriesRouter.route('/').post(requestValidator(CreateCategorySchema), categoriesController.create);

categoriesRouter
  .route('/search')
  .get(requestValidator(FindCategoryByCriteriaSchema), categoriesController.findByCriteria);

categoriesRouter
  .route('/:id')
  .get(requestValidator(FindByIdCategorySchema), categoriesController.findById)
  .patch(requestValidator(UpdateCategorySchema), categoriesController.update)
  .delete(requestValidator(DeleteCategorySchema), categoriesController.delete);

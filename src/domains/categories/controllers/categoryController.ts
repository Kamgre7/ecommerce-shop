import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { ParsedRequest } from '../../../apiTypes';
import { CreateCategoryReq } from '../schemas/createCategoryValidationSchema';
import { FindByIdCategoryReq } from '../schemas/findCategoryValidationSchema';
import { FindByCriteriaCategoryReq } from '../schemas/findByCriteriaCategoryValidationSchema';
import { UpdateCategoryReq } from '../schemas/updateCategoryValidationSchema';
import { DeleteCategoryReq } from '../schemas/deleteCategoryValidationSchema';
import { TYPES } from '../../../ioc/types/types';
import { ICategoriesService } from '../services/categoryService';

export interface ICategoriesController {
  create(req: ParsedRequest<CreateCategoryReq>, res: Response): Promise<void>;
  findById(req: ParsedRequest<FindByIdCategoryReq>, res: Response): Promise<void>;
  findByCriteria(req: ParsedRequest<FindByCriteriaCategoryReq>, res: Response): Promise<void>;
  update(req: ParsedRequest<UpdateCategoryReq>, res: Response): Promise<void>;
  delete(req: ParsedRequest<DeleteCategoryReq>, res: Response): Promise<void>;
}

@injectable()
export class CategoryController implements ICategoriesController {
  constructor(
    @inject(TYPES.CategoriesServiceToken)
    private readonly categoriesService: ICategoriesService,
  ) {}

  create = async (req: ParsedRequest<CreateCategoryReq>, res: Response): Promise<void> => {
    const category = await this.categoriesService.create(req.body);

    res.status(201).json({
      category,
    });
  };

  findById = async (req: ParsedRequest<FindByIdCategoryReq>, res: Response): Promise<void> => {
    const category = await this.categoriesService.findById(req.params.id);

    res.status(200).json({
      category,
    });
  };

  findByCriteria = async (req: ParsedRequest<FindByCriteriaCategoryReq>, res: Response): Promise<void> => {
    const categories = await this.categoriesService.findByCriteria(req.query);

    res.status(200).json({
      categories,
    });
  };

  update = async (req: ParsedRequest<UpdateCategoryReq>, res: Response): Promise<void> => {
    const { body, params } = req;

    const category = await this.categoriesService.update(body, params.id);

    res.status(200).json({
      category,
    });
  };

  delete = async (req: ParsedRequest<DeleteCategoryReq>, res: Response): Promise<void> => {
    await this.categoriesService.softDelete(req.params.id);

    res.sendStatus(204);
  };
}

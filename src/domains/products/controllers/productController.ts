import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { ParsedRequest } from '../../../apiTypes';
import { CreateProductReq } from '../schemas/createProductValidationSchema';
import { TYPES } from '../../../ioc/types/types';
import { IProductsService } from '../services/productService';
import { FindByIdProductReq } from '../schemas/findProductValidationSchema';
import { UpdateProductReq } from '../schemas/updateProductValidationSchema';
import { UpdateProductInventoryReq } from '../schemas/updateProductInventoryValidationSchema';
import {
  FindByCriteriaProductReq,
  FindProductByCriteriaQuerySchema,
} from '../schemas/findProductByCriteriaValidationSchema';

export interface IProductsController {
  create(req: ParsedRequest<CreateProductReq>, res: Response): Promise<void>;
  findById(req: ParsedRequest<FindByIdProductReq>, res: Response): Promise<void>;
  findByCriteria(req: ParsedRequest<FindByCriteriaProductReq>, res: Response): Promise<void>;
  update(req: ParsedRequest<UpdateProductReq>, res: Response): Promise<void>;
  updateInventory(req: ParsedRequest<UpdateProductInventoryReq>, res: Response): Promise<void>;
}

@injectable()
export class ProductsController implements IProductsController {
  constructor(
    @inject(TYPES.ProductsServiceToken)
    private readonly productsService: IProductsService,
  ) {}

  create = async (req: ParsedRequest<CreateProductReq>, res: Response): Promise<void> => {
    const product = await this.productsService.create(req.body);

    res.status(201).json({
      product,
    });
  };

  findById = async (req: ParsedRequest<FindByIdProductReq>, res: Response): Promise<void> => {
    const product = await this.productsService.findById(req.params.id);

    res.status(200).json({
      product,
    });
  };

  findByCriteria = async (req: ParsedRequest<FindByCriteriaProductReq>, res: Response): Promise<void> => {
    const parsedCriteria = FindProductByCriteriaQuerySchema.parse(req.query);

    const products = await this.productsService.findByCriteria(parsedCriteria);

    res.status(200).json({
      products,
    });
  };

  update = async (req: ParsedRequest<UpdateProductReq>, res: Response): Promise<void> => {
    const { body, params } = req;

    const product = await this.productsService.update(body, params.id);

    res.status(200).json({
      product,
    });
  };

  updateInventory = async (req: ParsedRequest<UpdateProductInventoryReq>, res: Response): Promise<void> => {
    const { body, params } = req;

    await this.productsService.updateInventory(params.inventoryId, body.quantity);

    res.sendStatus(204);
  };
}

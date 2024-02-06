import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { ParsedRequest } from '../../../apiTypes';
import { CreateProductReq } from '../schemas/createProductValidationSchema';
import { TYPES } from '../../../ioc/types/types';
import { IProductsService } from '../services/productService';

export interface IProductsController {
  create(req: ParsedRequest<CreateProductReq>, res: Response): Promise<void>;
}

@injectable()
export class ProductsController implements IProductsController {
  constructor(
    @inject(TYPES.ProductsServiceToken)
    private readonly productsService: IProductsService,
  ) {}

  create = async (req: ParsedRequest<CreateProductReq>, res: Response) => {
    const product = await this.productsService.create(req.body);

    res.status(201).json({
      product,
    });
  };
}

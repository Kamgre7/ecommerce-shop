import { object, string, z } from 'zod';
import { CreateProductBodySchema, NewProduct } from './createProductValidationSchema';

export const UpdateProductSchema = object({
  body: CreateProductBodySchema.partial(),
  params: object({
    id: string().uuid(),
  }),
});

export type UpdateProductReq = z.infer<typeof UpdateProductSchema>;
export type ProductUpdateData = Partial<NewProduct>;

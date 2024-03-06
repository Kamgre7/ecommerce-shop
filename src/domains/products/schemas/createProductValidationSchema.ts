import { number, object, string, z } from 'zod';

export const CreateProductBodySchema = object({
  name: string().min(3).max(25),
  description: string().min(3).max(1000),
  price: number().positive(),
  sku: string().min(3).max(5),
  category: string().uuid(),
  quantity: number().positive().int(),
});

export const CreateProductSchema = object({
  body: CreateProductBodySchema,
});

export type CreateProductReq = z.infer<typeof CreateProductSchema>;
export type NewProduct = z.infer<typeof CreateProductBodySchema>;

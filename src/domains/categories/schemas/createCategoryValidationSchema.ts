import { object, string, z } from 'zod';

export const CreateCategoryBodySchema = object({
  name: string().trim().min(3).max(25),
  description: string().min(3).max(1000),
});

export const CreateCategorySchema = object({
  body: CreateCategoryBodySchema,
});

export type CreateProductReq = z.infer<typeof CreateCategorySchema>;
export type NewCategory = z.infer<typeof CreateCategoryBodySchema>;

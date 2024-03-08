import { object, string, z } from 'zod';
import { CreateCategoryBodySchema, NewCategory } from './createCategoryValidationSchema';

export const UpdateCategorySchema = object({
  body: CreateCategoryBodySchema.partial(),
  params: object({
    id: string().uuid(),
  }),
});

export type UpdateCategoryReq = z.infer<typeof UpdateCategorySchema>;
export type CategoryUpdateData = Partial<NewCategory>;

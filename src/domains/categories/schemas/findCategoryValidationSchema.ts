import { object, string, z } from 'zod';

export const FindByIdCategorySchema = object({
  params: object({
    id: string().uuid(),
  }),
});

export type FindByIdCategoryReq = z.infer<typeof FindByIdCategorySchema>;

import { object, string, z } from 'zod';

export const DeleteCategorySchema = object({
  params: object({
    id: string().uuid(),
  }),
});

export type DeleteCategoryReq = z.infer<typeof DeleteCategorySchema>;

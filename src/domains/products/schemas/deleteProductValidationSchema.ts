import { object, string, z } from 'zod';

export const DeleteProductSchema = object({
  params: object({
    id: string().uuid(),
  }),
});

export type DeleteProductReq = z.infer<typeof DeleteProductSchema>;

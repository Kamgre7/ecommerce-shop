import { object, string, z } from 'zod';

export const FindByIdProductSchema = object({
  params: object({
    id: string().uuid(),
  }),
});

export type FindByIdProductReq = z.infer<typeof FindByIdProductSchema>;

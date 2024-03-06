import { number, object, string, z } from 'zod';

export const UpdateProductInventorySchema = object({
  body: object({
    quantity: number().int(),
  }),
  params: object({
    inventoryId: string().uuid(),
  }),
});

export type UpdateProductInventoryReq = z.infer<typeof UpdateProductInventorySchema>;

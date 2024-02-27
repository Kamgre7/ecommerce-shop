import { coerce, object, string, z } from 'zod';

const FindProductByCriteriaQuerySchema = object({
  name: string().trim().min(1).max(25).optional(),
  priceFrom: coerce.number().nonnegative().optional(),
  priceTo: coerce.number().positive().optional(),
  sku: string().min(1).max(5).optional(),
  category: string().uuid().optional(),
});

export const FindProductByCriteriaSchema = object({
  query: FindProductByCriteriaQuerySchema.refine((val) => {
    if (val.priceFrom && val.priceTo) {
      return val.priceFrom < val.priceTo;
    }

    return true;
  }),
});

export type FindByCriteriaProductReq = z.infer<typeof FindProductByCriteriaSchema>;
export type ProductsCriteria = z.infer<typeof FindProductByCriteriaQuerySchema>;

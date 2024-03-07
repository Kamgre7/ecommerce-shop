import { object, string, z } from 'zod';

export const FindCategoryByCriteriaQuerySchema = object({
  name: string().trim().min(1).max(25).optional(),
});

export const FindProductByCriteriaSchema = object({
  query: FindCategoryByCriteriaQuerySchema,
});

export type FindByCriteriaCategoryReq = z.infer<typeof FindProductByCriteriaSchema>;
export type CategoryCriteria = z.infer<typeof FindCategoryByCriteriaQuerySchema>;

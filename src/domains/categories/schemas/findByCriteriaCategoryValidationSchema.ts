import { object, string, z } from 'zod';

export const FindCategoryByCriteriaQuerySchema = object({
  name: string().trim().min(1).max(25).optional(),
});

export const FindCategoryByCriteriaSchema = object({
  query: FindCategoryByCriteriaQuerySchema,
});

export type FindByCriteriaCategoryReq = z.infer<typeof FindCategoryByCriteriaSchema>;
export type CategoryCriteria = z.infer<typeof FindCategoryByCriteriaQuerySchema>;

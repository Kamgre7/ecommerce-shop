import { inject, injectable } from 'inversify';
import { sql } from 'kysely';
import { plainToClass } from 'class-transformer';
import { TYPES } from '../../../ioc/types/types';
import { IErrorMapper } from '../../../errors/errorMapper';
import { database } from '../../../database/database';
import { NewCategory } from '../schemas/createCategoryValidationSchema';
import { CategoryDb } from '../types/categoryTypes';
import { Category, ICategory } from '../models/Category';
import { CategoryCriteria } from '../schemas/findByCriteriaCategoryValidationSchema';
import { CategoryUpdateData } from '../schemas/updateCategoryValidationSchema';

export interface ICategoriesRepository {
  create(newCategory: NewCategory): Promise<ICategory>;
  findById(id: string): Promise<ICategory | null>;
  findByCriteria(criteria: CategoryCriteria): Promise<ICategory[]>;
  update(categoryData: CategoryUpdateData, id: string): Promise<ICategory | null>;
  softDelete(id: string): Promise<boolean>;
}

@injectable()
export class CategoriesRepository implements ICategoriesRepository {
  private readonly categoriesTable = 'categories';

  constructor(
    @inject(TYPES.ErrorMapperToken)
    private readonly errorMapper: IErrorMapper,
    private readonly db = database,
  ) {}

  async create(newCategory: NewCategory): Promise<ICategory> {
    try {
      const category = await this.db
        .insertInto(this.categoriesTable)
        .values(newCategory)
        .returningAll()
        .executeTakeFirstOrThrow();

      return plainToClass(Category, { ...this.snakeToCamelCase(category) });
    } catch (err) {
      throw this.errorMapper.mapRepositoryError(err);
    }
  }

  async findById(id: string): Promise<ICategory | null> {
    const category = await this.db
      .selectFrom(this.categoriesTable)
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .selectAll()
      .executeTakeFirst();

    if (!category) {
      return null;
    }

    return plainToClass(Category, { ...this.snakeToCamelCase(category) });
  }

  async findByCriteria(criteria: CategoryCriteria): Promise<ICategory[]> {
    let query = this.db.selectFrom(this.categoriesTable);

    if (criteria.name) query = query.where('name', 'ilike', `%${criteria.name}%`);

    const categories = await query.where('deleted_at', 'is', null).selectAll().distinctOn('id').execute();

    return categories.map((category) =>
      plainToClass(Category, {
        ...this.snakeToCamelCase(category),
      }),
    );
  }

  async update(categoryData: CategoryUpdateData, id: string): Promise<ICategory | null> {
    try {
      const updatedCategory = await this.db
        .updateTable(this.categoriesTable)
        .set({ ...categoryData })
        .where('id', '=', id)
        .where('deleted_at', 'is', null)
        .returningAll()
        .executeTakeFirst();

      if (!updatedCategory) {
        return null;
      }

      return plainToClass(Category, { ...this.snakeToCamelCase(updatedCategory) });
    } catch (err) {
      throw this.errorMapper.mapRepositoryError(err);
    }
  }

  async softDelete(id: string): Promise<boolean> {
    try {
      const dbResponse = await this.db
        .updateTable(this.categoriesTable)
        .set({
          deleted_at: sql`now()`,
        })
        .where('id', '=', id)
        .where('deleted_at', 'is', null)
        .executeTakeFirst();

      const numberOfDeletedRows = Number(dbResponse.numUpdatedRows.toString());

      return numberOfDeletedRows > 0;
    } catch (err) {
      throw this.errorMapper.mapRepositoryError(err);
    }
  }

  private snakeToCamelCase(category: CategoryDb) {
    const { created_at: createdAt, updated_at: updatedAt, deleted_at: deletedAt, ...rest } = category;

    return {
      ...rest,
      createdAt,
      deletedAt,
      updatedAt,
    };
  }
}

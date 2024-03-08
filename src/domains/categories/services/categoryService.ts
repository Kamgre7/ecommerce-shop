import { inject, injectable } from 'inversify';
import { TYPES } from '../../../ioc/types/types';
import { ICategoriesRepository } from '../repository/categoryRepository';
import { NewCategory } from '../schemas/createCategoryValidationSchema';
import { ICategory } from '../models/Category';
import { CategoryCriteria } from '../schemas/findByCriteriaCategoryValidationSchema';
import { CategoryUpdateData } from '../schemas/updateCategoryValidationSchema';
import { NotFoundError } from '../../../errors/notFoundError';

export interface ICategoriesService {
  create(newCategory: NewCategory): Promise<ICategory>;
  findById(id: string): Promise<ICategory>;
  findByCriteria(criteria: CategoryCriteria): Promise<ICategory[]>;
  update(categoryData: CategoryUpdateData, id: string): Promise<ICategory>;
  softDelete(id: string): Promise<void>;
}

@injectable()
export class CategoriesService implements ICategoriesService {
  constructor(
    @inject(TYPES.CategoriesRepositoryToken)
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async create(newCategory: NewCategory): Promise<ICategory> {
    return this.categoriesRepository.create(newCategory);
  }

  async findById(id: string): Promise<ICategory> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  async findByCriteria(criteria: CategoryCriteria): Promise<ICategory[]> {
    return this.categoriesRepository.findByCriteria(criteria);
  }

  async update(categoryData: CategoryUpdateData, id: string): Promise<ICategory> {
    const category = await this.categoriesRepository.update(categoryData, id);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  async softDelete(id: string): Promise<void> {
    const isDeleted = await this.categoriesRepository.softDelete(id);

    if (!isDeleted) {
      throw new NotFoundError('Category not found');
    }
  }
}

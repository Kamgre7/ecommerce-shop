export const TYPES = {
  ProductsControllerToken: Symbol.for('IProductsController'),
  ProductsServiceToken: Symbol.for('IProductsService'),
  ProductsRepositoryToken: Symbol.for('IProductsRepository'),

  ProductsInventoryRepositoryToken: Symbol.for('IProductsInventoryRepository'),

  CategoriesRepositoryToken: Symbol.for('ICategoriesRepository'),
  CategoriesServiceToken: Symbol.for('ICategoriesService'),
  CategoriesControllerToken: Symbol.for('ICategoriesController'),

  UsersControllerToken: Symbol.for('IUsersController'),
  UsersServiceToken: Symbol.for('IUsersService'),
  UsersRepositoryToken: Symbol.for('IUsersRepository'),

  PasswordManagerToken: Symbol.for('IPasswordManager'),

  ErrorMapperToken: Symbol.for('IErrorMapper'),
};

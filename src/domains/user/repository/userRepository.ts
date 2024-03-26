import { inject, injectable } from 'inversify';
import { plainToClass } from 'class-transformer';
import { sql } from 'kysely';
import { TYPES } from '../../../ioc/types/types';
import { IErrorMapper } from '../../../errors/errorMapper';
import { IUser, User } from '../models/User';
import { database } from '../../../database/database';
import { NewUser } from '../schemas/createUserValidationSchema';
import { UserDb } from '../types/userTypes';

export interface IUsersRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(id: string): Promise<IUser | null>;
  create(newUser: NewUser): Promise<IUser>;
  softDelete(id: string): Promise<boolean>;
}

@injectable()
export class UsersRepository implements IUsersRepository {
  private readonly usersTable = 'users';

  constructor(
    @inject(TYPES.ErrorMapperToken)
    private readonly errorMapper: IErrorMapper,
    private readonly db = database,
  ) {}

  async create(newUser: NewUser): Promise<IUser> {
    try {
      const user = await this.db.insertInto('users').values(newUser).returningAll().executeTakeFirstOrThrow();

      return plainToClass(User, { ...this.snakeToCamelCase(user) });
    } catch (err) {
      throw this.errorMapper.mapRepositoryError(err);
    }
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.db
      .selectFrom(this.usersTable)
      .where('id', '=', id)
      .where('deleted_at', 'is', null)
      .selectAll()
      .executeTakeFirst();

    return user ? plainToClass(User, { ...this.snakeToCamelCase(user) }) : null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.db
      .selectFrom(this.usersTable)
      .where('email', '=', email)
      .where('deleted_at', 'is', null)
      .selectAll()
      .executeTakeFirst();

    return user ? plainToClass(User, { ...this.snakeToCamelCase(user) }) : null;
  }

  async softDelete(id: string): Promise<boolean> {
    try {
      const dbResponse = await this.db
        .updateTable(this.usersTable)
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

  private snakeToCamelCase(user: UserDb) {
    const { created_at: createdAt, updated_at: updatedAt, deleted_at: deletedAt, ...rest } = user;

    return {
      ...rest,
      createdAt,
      deletedAt,
      updatedAt,
    };
  }
}

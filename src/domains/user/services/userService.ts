import { inject, injectable } from 'inversify';
import { TYPES } from '../../../ioc/types/types';
import { IUsersRepository } from '../repository/userRepository';
import { NewUser } from '../schemas/createUserValidationSchema';
import { IUser } from '../models/User';
import { IPasswordManager } from '../../passwordManager/passwordManager';

export interface IUsersService {
  create(newUser: NewUser): Promise<IUser>;
}

@injectable()
export class UsersService implements IUsersService {
  constructor(
    @inject(TYPES.PasswordManagerToken)
    private readonly passwordManager: IPasswordManager,
    @inject(TYPES.UsersRepositoryToken)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(newUser: NewUser): Promise<IUser> {
    const passwordSalt = await this.passwordManager.generateSalt();
    const password = await this.passwordManager.hashPwd(newUser.password, passwordSalt);

    const user = await this.usersRepository.create({
      ...newUser,
      password,
    });

    return user;
  }
}

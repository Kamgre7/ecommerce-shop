import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { ParsedRequest } from '../../../apiTypes';
import { CreateUserReq } from '../schemas/createUserValidationSchema';
import { IUsersService } from '../services/userService';
import { TYPES } from '../../../ioc/types/types';

export interface IUsersController {
  create(req: ParsedRequest<CreateUserReq>, res: Response): Promise<void>;
}

@injectable()
export class UsersController implements IUsersController {
  constructor(
    @inject(TYPES.UsersServiceToken)
    private readonly usersService: IUsersService,
  ) {}

  create = async (req: ParsedRequest<CreateUserReq>, res: Response): Promise<void> => {
    const user = await this.usersService.create(req.body);

    res.status(201).json({
      user,
    });
  };
}

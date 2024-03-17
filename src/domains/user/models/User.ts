import { Exclude } from 'class-transformer';
import { GenderType } from '../types/gender';
import { RoleType } from '../types/userRole';

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: GenderType;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class User implements IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: GenderType;
  role: RoleType;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;
}

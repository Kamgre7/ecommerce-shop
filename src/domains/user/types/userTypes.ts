import { GenderType } from './gender';
import { RoleType } from './userRole';

export interface UserDb {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: GenderType;
  id: string;
  role: RoleType;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

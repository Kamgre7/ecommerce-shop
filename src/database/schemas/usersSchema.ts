import { Generated } from 'kysely';
import { GenderType } from '../../domains/user/types/gender';
import { RoleType } from '../../domains/user/types/userRole';

export interface UsersTable {
  id: Generated<string>;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: GenderType;
  role: Generated<RoleType>;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  deleted_at: Generated<Date> | null;
}

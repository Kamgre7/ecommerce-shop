import { nativeEnum, object, string, z } from 'zod';
import { GENDER } from '../types/gender';

// Minimum eight characters, at least one uppercase, one lowercase character, one number and one special character
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const CreateUserBodySchema = object({
  email: string().email(),
  firstName: string().min(3),
  lastName: string().min(3),
  password: string().regex(passwordRegex),
  gender: nativeEnum(GENDER),
});

export const CreateUserSchema = object({
  body: CreateUserBodySchema,
});

export type CreateUserReq = z.infer<typeof CreateUserSchema>;
export type NewUser = z.infer<typeof CreateUserBodySchema>;

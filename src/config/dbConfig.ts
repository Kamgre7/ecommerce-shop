import { types } from 'pg';
import { coerce, object, string, z } from 'zod';

types.setTypeParser(1700, (val) => parseFloat(val));

export const DbSchema = object({
  dbName: string().min(1),
  dbHost: string().min(1),
  dbUser: string().min(1),
  dbPassword: string().min(1),
  dbPort: coerce.number(),
});

export type DbConfig = z.infer<typeof DbSchema>;

export const dbConfig = DbSchema.parse({
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
});

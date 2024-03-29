import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './schemas/databaseSchema';
import { dbConfig } from '../config/dbConfig';

export const database = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: dbConfig.dbName,
      host: dbConfig.dbHost,
      user: dbConfig.dbUser,
      port: dbConfig.dbPort,
      password: dbConfig.dbPassword,
    }),
  }),
});

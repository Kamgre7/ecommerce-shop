/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely, sql } from 'kysely';
import { GENDER } from '../../domains/user/types/gender';
import { ROLE } from '../../domains/user/types/userRole';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createType('GenderType').asEnum([GENDER.FEMALE, GENDER.MALE]).execute();
  await db.schema.createType('UserRole').asEnum([ROLE.ADMIN, ROLE.USER]).execute();

  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('email', 'varchar(50)', (col) => col.unique().notNull())
    .addColumn('firstName', 'varchar(20)', (col) => col.notNull())
    .addColumn('lastName', 'varchar(20)', (col) => col.notNull())
    .addColumn('password', 'varchar', (col) => col.notNull())
    .addColumn('role', sql`"UserRole"`, (col) => col.defaultTo(ROLE.USER))
    .addColumn('gender', sql`"GenderType"`, (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('updatedAt', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('deletedAt', 'timestamp', (col) => col.defaultTo(null))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute();
}

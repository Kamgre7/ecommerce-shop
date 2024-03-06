/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('products')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'varchar(25)', (col) => col.unique().notNull())
    .addColumn('description', 'varchar(1000)', (col) => col.notNull())
    .addColumn('price', 'decimal', (col) => col.notNull())
    .addColumn('sku', 'varchar(5)', (col) => col.notNull())
    .addColumn('category_id', 'uuid', (col) => col.references('categories.id'))
    .addColumn('inventory_id', 'uuid', (col) => col.unique().references('products_inventory.id'))
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('deleted_at', 'timestamp', (col) => col.defaultTo(null))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('products').execute();
}

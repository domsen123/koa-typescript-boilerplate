import knex, { PgConnectionConfig } from 'knex';
import { migrate as user } from '../data-access/user.db';

let __db: knex | undefined;

export const getConnectionString = (): string => {
  const host = process.env.PG_HOST ?? '127.0.0.1';
  const port = process.env.PG_PORT ?? '5432';
  const user = process.env.PG_USER ?? 'postgres';
  const password = process.env.PG_PASSWORD;
  const db = process.env.PG_DB ?? 'pg';

  return `postgres://${user}:${password}@${host}:${port}/${db}`;
};

export const getDatabase = async (): Promise<knex> => {
  if (!__db) {
    __db = knex({
      client: 'pg',
      version: '7.2',
      connection: {
        host: process.env.PG_HOST ?? '127.0.0.1',
        port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
        user: process.env.PG_USER ?? 'postgres',
        password: process.env.PG_PASSWORD ?? '',
        database: process.env.PG_DB ?? 'pg',
      },
    });
    __db.schema.dropSchemaIfExists('graphile_worker');
    await user(true);
  }
  return __db;
};

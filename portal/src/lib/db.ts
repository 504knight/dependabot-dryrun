import knex, { type Knex } from 'knex';
import type { Env } from './env';

let instance: Knex | undefined;

export function getDb(env: Env): Knex {
  instance ??= knex({
    client: 'mysql2',
    connection: {
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      database: env.DATABASE_NAME,
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
    },
    pool: { min: 0, max: 5 },
  });
  return instance;
}

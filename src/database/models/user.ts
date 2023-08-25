import pool from '../../config/database.config';
import { logger } from '../../utilities';

const usersTable = `DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            email CHARACTER VARYING(255) NOT NULL,
            password CHARACTER VARYING(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
        )`;

/**
 * Function representing usertableHandler
 */
export async function createUserTable(): Promise<void> {
  try {
    const create = await pool.query(usersTable);
    logger.info(`userTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    logger.error(`userTable ${error}`);
  }
}

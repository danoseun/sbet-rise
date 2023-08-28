import pool from '../../config/database.config';
import { logger } from '../../utilities';

const postsTable = `DROP TABLE IF EXISTS posts CASCADE;
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            FOREIGN KEY (user_id) references users (id) on delete cascade,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
        )`;

/**
 * Function representing posttableHandler
 */
export async function createPostTable(): Promise<void> {
  try {
    const create = await pool.query(postsTable);
    logger.info(`postTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    logger.error(`postTable ${error}`);
  }
}

const indexPostTable = `CREATE INDEX idx_user_id ON posts(user_id);`;

export async function indexPostTableCreator(): Promise<void> {
  try {
    const create = await pool.query(indexPostTable);
    logger.info(`postTableIndex: ${create.command}D`);
  } catch (error) {
    logger.error(`postTableIndex ${error}`);
  }
}

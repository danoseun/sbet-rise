import pool from '../../config/database.config';
import { logger } from '../../utilities';

const postsTable = `DROP TABLE IF EXISTS comments CASCADE;
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY NOT NULL,
            post_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            FOREIGN KEY (post_id) references posts (id) on delete cascade,
            FOREIGN KEY (user_id) references users (id) on delete cascade,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
        )`;

/**
 * Function representing commenttableHandler
 */
export async function createCommentTable(): Promise<void> {
  try {
    const create = await pool.query(postsTable);
    logger.info(`commentTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    logger.error(`commentTable ${error}`);
  }
}

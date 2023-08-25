import pool from '../../config/database.config';
import format from 'pg-format';
import { logger } from '../../utilities';



const variables = [
  [1, 'It makes sense to start investing on time'],
  [1, 'I saved up some dollars at risevest'],
  [3, 'My investment is safe at risevest'],
  [4, 'stashing up my hard earned money']
];
const sql = format('INSERT INTO posts (user_id, content) VALUES %L returning id', variables);

/**
 * Function representing postsSeeder
*/
export async function seedPosts(): Promise<void> {
  try {
    const result = await pool.query(sql);
    logger.info(`Posts ${result.command}ED`);
  } catch (error) {
    logger.error(`seedPosts ${error}`);
  }
}
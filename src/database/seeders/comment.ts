import pool from '../../config/database.config';
import format from 'pg-format';
import { logger } from '../../utilities';



const variables = [
  [1, 2, 'I agree with this'],
  [1, 3, 'Thumbs up man!'],
  [3, 1, 'You can not be wrong doing this!'],
  [4, 2, '100% makes sense!']
];
const sql = format('INSERT INTO comments (post_id, user_id, content) VALUES %L returning id', variables);

/**
 * Function representing commentsSeeder
*/
export async function seedComments(): Promise<void> {
  try {
    const result = await pool.query(sql);
    logger.info(`comments ${result.command}ED`);
  } catch (error) {
    logger.error(`seedComments ${error}`);
  }
}
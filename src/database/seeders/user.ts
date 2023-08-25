import dotenv from 'dotenv';
import pool from '../../config/database.config';
import format from 'pg-format';
import { logger, hashPassword } from '../../utilities';


dotenv.config();

const hashedPassword = hashPassword('password')

const variables = [
  ['userone@gmail.com', hashedPassword],
  ['usertwo@gmail.com', hashedPassword],
  ['userthree@gmail.com', hashedPassword],
  ['userfour@gmail.com', hashedPassword]
];
const sql = format('INSERT INTO users (email, password) VALUES %L returning id', variables);

/**
  * Function representing usersSeeder
*/
export async function seedUsers(): Promise<void> {
  try {
    const result = await pool.query(sql);
    logger.info(`Users ${result.command}ED`);
  } catch (error) {
    logger.error(`seedUsers ${error}`);
  }
}
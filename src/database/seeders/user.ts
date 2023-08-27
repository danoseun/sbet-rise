import dotenv from 'dotenv';
import pool from '../../config/database.config';
import format from 'pg-format';
import { logger, hashPassword } from '../../utilities';


dotenv.config();

const hashedPassword = hashPassword('Password54@')

const variables = [
  ['userone@gmail.com', 'Gimba Kakanda', hashedPassword],
  ['usertwo@gmail.com', 'Bosun Tijani', hashedPassword],
  ['userthree@gmail.com', 'Boss Boy', hashedPassword],
  ['userfour@gmail.com', 'Emi Lokan', hashedPassword]
];
const sql = format('INSERT INTO users (email, name, password) VALUES %L returning id', variables);

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
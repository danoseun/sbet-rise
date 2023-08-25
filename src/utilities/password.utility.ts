import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import variables from '../variables';

dotenv.config();

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
export const hashPassword = (password: string): string => bcrypt.hashSync(password, variables.auth.rounds);

/**
 * compare Password
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {Boolean} return true or false
 */
export const comparePassword = (password: string, hashedPassword: string): boolean => bcrypt.compareSync(password, hashedPassword);


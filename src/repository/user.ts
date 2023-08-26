import db from '../database/query'
import { sql } from '../database/sql';
import type { User } from '../interfaces'

export const createUser = async(filters: Partial<User>): Promise<User> => {
    const newUser = await db.query(sql.createUser, [filters])
    return newUser.rows[0];
}

export const findUser = async(filters: Partial<User>): Promise<User> => {
    const foundUser = await db.query(sql.fetchSingleUser, [filters])
    return foundUser.rows[0];
}

export const fetchAllUsers = async(filters: Partial<User>): Promise<User[] | null> => {
    const allUsers = await db.query(sql.fetchAllUsersQuery);
    return allUsers.rows;
}
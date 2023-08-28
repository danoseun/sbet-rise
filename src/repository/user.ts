import db from '../database/query'
import { sql } from '../database/sql';
import type { Post, User } from '../interfaces'

export const createUser = async(filters: Partial<User>): Promise<User> => {
    const newUser = await db.query(sql.createUser, filters)
    return newUser.rows[0];
}

export const findUser = async(filters: Partial<User>): Promise<User> => {
    const foundUser = await db.query(sql.fetchSingleUser, filters)
    return foundUser.rows[0];
}

export const fetchAllUsers = async(filters?: Partial<User>): Promise<User[] | null> => {
    const allUsers = await db.query(sql.fetchAllUsersQuery);
    return allUsers.rows;
}

export const featuredUsersUnOptimized = async(filters?: any): Promise<User[] | Post[] | Comment[] | null> => {
    const featuredUsers = await db.query(sql.unOptimizedQuery);
    return featuredUsers.rows;
}

export const featuredUsersOptimized = async(filters?: any): Promise<User[] | Post[] | Comment[] | null> => {
    console.log('enter')
    const featuredUsers = await db.query(sql.optimisedQuery);
    console.log('fetaured')
    return featuredUsers.rows;
}
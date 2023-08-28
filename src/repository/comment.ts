import db from '../database/query'
import { sql } from '../database/sql';
import type { Comment } from '../interfaces'

export const createComment = async(filters: Partial<Comment>): Promise<Comment> => {
    const newComment = await db.query(sql.createComment, filters)
    return newComment.rows[0];
}


export const fetchAllCommentsForPost = async(filters?: Partial<Comment>): Promise<Comment[] | null> => {
    const allPostComments = await db.query(sql.fetchPostComments, filters);
    return allPostComments.rows;
}
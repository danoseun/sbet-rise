import db from '../database/query'
import { sql } from '../database/sql';
import type { Post } from '../interfaces'

export const createPost = async(filters: Partial<Post>): Promise<Post> => {
    const newPost = await db.query(sql.createPost, filters)
    return newPost.rows[0];
}


export const fetchAllPostsForUser = async(filters?: Partial<Post>): Promise<Post[] | null> => {
    const allUserPosts = await db.query(sql.fetchUserPosts, filters);
    return allUserPosts.rows;
}
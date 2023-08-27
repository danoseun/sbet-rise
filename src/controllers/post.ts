import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';
import { createPost, fetchAllPostsForUser } from '../repository/post';

import type { Post, User } from '../interfaces';
import { respond } from '../utilities';
import { findUser } from '../repository/user';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

export const PostController = {
    createPost: (): RequestHandler => async(req, res, next) => {
        // depending on the blog size, we may want to scan contents for anything abusive
        let params = [res.locals.user.id, req.body.content];
        try {
            const post = await createPost(params as Partial<Post>)
            return respond<Post>(res, post, HttpStatus.CREATED);
        } catch (error) {
            next(error)
        }
    },

    fetchAllUserPosts: (): RequestHandler => async(req, res, next) => {
        const { id } = req.params;
        try {
            const user = await findUser(['%'+id+'%'] as Partial<User>);
            if(!user){
                throw new ResourceNotFoundError('fetching posts for non-existent user');
            }
            const posts = await fetchAllPostsForUser([user.id] as Partial<Post>);
            return respond<Post[]>(res, posts, HttpStatus.OK);
        } catch (error) {
            next(error)
        }
    }
}


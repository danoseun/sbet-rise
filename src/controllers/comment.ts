import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';
import { createComment, fetchAllCommentsForPost } from '../repository/comment';

import type { Post, Comment } from '../interfaces';
import { respond } from '../utilities';
import { findPost } from '../repository/post';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

export const CommentController = {
    createComment: (): RequestHandler => async(req, res, next) => {

        let params = [req.params.id, res.locals.user.id, req.body.content];
        try {
            const foundPost = await findPost([req.params.id] as Partial<Post>)
           
            if(!foundPost){
                throw new ResourceNotFoundError('attempting to comment on non-existent post');
            }
            const comment = await createComment(params as Partial<Comment>)
            return respond<Comment>(res, comment, HttpStatus.CREATED);
        } catch (error) {
            next(error)
        }
    },

    fetchAllPostComments: (): RequestHandler => async(req, res, next) => {
        const { id } = req.params;
        try {
            const foundPost = await findPost([id] as Partial<Post>);
            
            if(!foundPost){
                throw new ResourceNotFoundError('fetching comments for non-existent post');
            }
            const posts = await fetchAllCommentsForPost([foundPost.id] as Partial<Post>);
            return respond<Post[]>(res, posts, HttpStatus.OK);
        } catch (error) {
            next(error)
        }
    }
}


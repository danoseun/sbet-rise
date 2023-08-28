import { Router } from 'express';

import { createUserSchema, loginUserSchema } from '../validations/user';
import { createPostSchema, fetchPostsForUserSchema } from '../validations/post';
import { createCommentSchema, fetchCommentsForPostSchema } from '../validations/comments';

import { authenticate } from '../middleware/authenticate';

import { UserController, PostController, CommentController } from '../controllers';

export const router = Router();

// users
router.post('/users', createUserSchema, UserController.createUser())
router.post('/login', loginUserSchema, UserController.loginUser())
router.get('/users', authenticate(), UserController.fetchAllUsers());
router.get('/unoptimized', UserController.fetchFeaturedUsersUnOptimized);
router.get('/optimized', UserController.fetchFeaturedUsersOptimized);

//posts
router.post('/posts', authenticate(), createPostSchema, PostController.createPost());
router.get('/users/:id/posts', fetchPostsForUserSchema, PostController.fetchAllUserPosts());

//comments
router.post('/posts/:id/comments', authenticate(), createCommentSchema, CommentController.createComment());
router.get('/posts/:id/comments', fetchCommentsForPostSchema, CommentController.fetchAllPostComments());
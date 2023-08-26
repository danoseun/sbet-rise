import { Router } from 'express';

import { createUserSchema, loginUserSchema } from '@src/validations/user';
import { createPostSchema, fetchPostsForUserSchema } from '@src/validations/post';
import { createCommentSchema, fetchCommentsForPostSchema } from '@src/validations/comments';

import { authenticate } from '@src/middleware/authenticate';

import { UserController } from '@src/controllers/user';

export const router = Router();

router.post('/users', createUserSchema, UserController.createUser())
router.post('/login', loginUserSchema, UserController.loginUser())
router.get('/users', authenticate(), UserController.fetchAllUsers());

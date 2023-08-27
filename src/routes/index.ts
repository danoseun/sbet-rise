import { Router } from 'express';

import { createUserSchema, loginUserSchema } from '../validations/user';
import { createPostSchema, fetchPostsForUserSchema } from '../validations/post';
import { createCommentSchema, fetchCommentsForPostSchema } from '../validations/comments';

import { authenticate } from '../middleware/authenticate';

import { UserController } from '../controllers/user';

export const router = Router();

router.post('/users', createUserSchema, UserController.createUser())
router.post('/login', loginUserSchema, UserController.loginUser())
router.get('/users', authenticate(), UserController.fetchAllUsers());

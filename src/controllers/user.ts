import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';
import { createUser, findUser, fetchAllUsers } from '@src/repository/user';
import { ConflictError } from '@src/errors/ConflictError';
import { ResourceNotFoundError } from '@src/errors/ResourceNotFoundError';

import type { User } from '@src/interfaces';
import { hashPassword, comparePassword, respond, JWT } from '@src/utilities';
import { BadRequestError } from '@src/errors/BadRequestError';

export const UserController = {
    createUser: (): RequestHandler => async(req, res, next) => {
        let params = [req.body.email, req.body.password];
        try {
            const existingUser = await findUser(['%'+params[0]+'%'] as Partial<User>);
            if(existingUser){
                throw new ConflictError('User already exists');
            }
            let user: User;
            params[1] = hashPassword(params[1]);
            user = await createUser(params as Partial<User>)
            return respond<User>(res, user, HttpStatus.CREATED);
        } catch (error) {
            next(error)
        }
    },

    loginUser: (): RequestHandler => async(req, res, next) => {
        let params = [req.body.email, req.body.password];
        let accessToken: string;
        try {
            const existingUser = await findUser(['%'+params[0]+'%'] as Partial<User>);
            if(!existingUser){
                throw new ResourceNotFoundError('You may want to signup with this email');
            }
            const compare = comparePassword(params[1], existingUser.password)
            if(!compare){
                throw new BadRequestError('Kindly check the password');
            }
            else {
                accessToken = JWT.encode({ id: existingUser.id })
            }
            return respond(res, accessToken, HttpStatus.OK);
        } catch (error) {
            next(error)
        }
    },

    fetchAllUsers: (): RequestHandler => async(req, res, next) => {
        try {
            const users = await fetchAllUsers()
            return respond<User[]>(res, users, HttpStatus.OK);
        } catch (error) {
            next(error)
        }
    }
}


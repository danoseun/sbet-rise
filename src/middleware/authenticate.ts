import { Request, Response, NextFunction } from 'express';
import { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { findUser } from '../repository/user';
import { NotAuthenticatedError } from '../errors/NotAuthenticatedError';
import { JWT } from '../utilities';


export const authenticate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new NotAuthenticatedError('No token provided'));
    }

    const [, token] = authorization.split(' ');

    try {
      if (!token) {
        return next(new NotAuthenticatedError('No token provided'));
      }

      const decoded = JWT.decode(token);

      const user = await findUser({ id: decoded.id });

      if (!user) {
        return next(new NotAuthenticatedError('Invalid token'));
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(new NotAuthenticatedError('Token has expired'));
      }

      if (error instanceof NotBeforeError) {
        return next(new NotAuthenticatedError('Token used prematurely'));
      }

      return next(error);
    }
  };
};



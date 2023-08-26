import jwt from 'jsonwebtoken';
import { User } from '../interfaces';

import variables from '../variables';

export class JWT {
  private static secret: jwt.Secret = variables.auth.secret;

  public static encode(payload: Partial<User>, options?: Partial<jwt.SignOptions>): string {
    const token = jwt.sign(payload, this.secret, { expiresIn: variables.auth.jwtExpiryTime || '1h', ...options });
    return token;
  }

  public static decode(token: string): jwt.JwtPayload {
    const decoded = jwt.verify(token, this.secret);
    return decoded as jwt.JwtPayload;
  }
}

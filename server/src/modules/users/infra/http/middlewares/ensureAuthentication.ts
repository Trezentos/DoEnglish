import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { secret } = authConfig.jwt;

    const decoded = verify(token, secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid token authorization', 401);
  }
}

export default ensureAuthentication;

import { Request, Response } from 'express';
import AuthenticanteUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticanteUserService);

    const authenticatedUser = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(classToClass(authenticatedUser));
  }
}

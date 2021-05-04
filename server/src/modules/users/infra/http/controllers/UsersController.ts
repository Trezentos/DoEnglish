import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const newUser = await createUser.execute({
            email,
            name,
            password,
        });

        return response.json(classToClass(newUser));
    }
}

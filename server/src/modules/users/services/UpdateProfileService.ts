import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private HashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithoutUpdatedEmail = await this.usersRepository.findByEmail(
      email,
    );

    if (userWithoutUpdatedEmail && userWithoutUpdatedEmail.id !== user.id) {
      throw new AppError('This email is already registered in our service.');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('You need to inform the old password');
    }

    if (password && old_password) {
      const matchedPassword = await this.HashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!matchedPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.HashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;

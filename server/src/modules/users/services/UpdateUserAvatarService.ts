import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename;

        this.usersRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;

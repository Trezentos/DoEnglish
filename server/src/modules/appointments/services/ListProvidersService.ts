import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
    except_user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ except_user_id }: IRequest): Promise<User[]> {
        let users = await this.cacheProvider.recover<User[]>(
            `providers-list:${except_user_id}`,
        );

        if (!users) {
            users = await this.usersRepository.findAllProviders({
                except_user_id,
            });

            console.log('A query no banco foi feita.');

            await this.cacheProvider.save(
                `providers-list:${except_user_id}`,
                users,
            );
        }

        return users;
    }
}

export default ListProvidersService;

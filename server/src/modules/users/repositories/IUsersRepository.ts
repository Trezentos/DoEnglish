import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
    findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: CreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}

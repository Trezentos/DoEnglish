import { v4 } from 'uuid';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../IUsersRepository';

class FakeUsersRepository implements IUserRepository {
    private users: User[] = [];

    public async findAllProviders({
        except_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        const users = this.users.filter(user => user.id !== except_user_id);

        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const userFound = this.users.find(user => user.id === id);

        return userFound;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const userFound = this.users.find(user => user.email === email);

        return userFound;
    }

    public async create({
        email,
        name,
        password,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: v4(), name, email, password });

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const indexUser = this.users.findIndex(
            findIndex => findIndex.id === user.id,
        );

        this.users[indexUser] = user;

        return user;
    }
}

export default FakeUsersRepository;

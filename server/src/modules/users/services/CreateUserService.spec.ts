import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('Create User', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );
    });

    it('Should be able to create a new user', async () => {
        const user = await createUser.execute({
            email: 'personTesting@hotmail.com',
            name: 'Person Testing da Silva',
            password: 'testingRandomPass',
        });

        expect(user).toHaveProperty('id');
    });

    it('Should not be able to create 2 users with same email', async () => {
        const sameEmail = 'sameemail10@hotmail.com';

        await createUser.execute({
            email: sameEmail,
            name: 'User 1',
            password: 'userpassword1',
        });

        await expect(
            createUser.execute({
                email: sameEmail,
                name: 'User 2',
                password: 'userpassword2',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

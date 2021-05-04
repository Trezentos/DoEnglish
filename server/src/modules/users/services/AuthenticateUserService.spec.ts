import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('Authenticate User', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeUsersRepository = new FakeUsersRepository();
        authenticateUserService = new AuthenticateUserService(
            fakeHashProvider,
            fakeUsersRepository,
        );
    });

    it('Should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
            name: 'User Test da Silva',
            email: 'usertestdasilva123@hotmail.com',
            password: 'randompassword123',
        });

        const response = await authenticateUserService.execute({
            email: 'usertestdasilva123@hotmail.com',
            password: 'randompassword123',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('Should be able to return some error if the user is invalid', async () => {
        await expect(
            authenticateUserService.execute({
                email: 'aninvaliduser@hotmail.com',
                password: 'randompassword123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to return some error if the password is invalid', async () => {
        await fakeUsersRepository.create({
            name: 'Test Da Silva',
            email: 'testingdasilva@hotmail.com',
            password: 'randompassword123',
        });
        await expect(
            authenticateUserService.execute({
                email: 'testingdasilva@hotmail.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

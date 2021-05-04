import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;
let fakeHashProvider: FakeHashProvider;

describe('Update Profile Service', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('Should be able to change the email and name profile', async () => {
        const user = await fakeUsersRepository.create({
            email: 'testingdasilva@hotmail.com',
            name: 'Test da Silva',
            password: 'randompassword123',
        });

        await updateProfile.execute({
            user_id: user.id,
            email: 'testindasilva2@gmail.com',
            name: 'Test da Silva Fernando Morocotó',
        });

        expect(user.email).toBe('testindasilva2@gmail.com');
        expect(user.name).toBe('Test da Silva Fernando Morocotó');
    });

    it('Should be able to return some erro if the user does not exist', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-existing',
                name: 'non-existing',
                email: 'non-exisintg@hotmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to return some error if the old password was not inform to renew password', async () => {
        const user = await fakeUsersRepository.create({
            email: 'testingdasilva@hotmail.com',
            name: 'Test da Silva',
            password: 'randompassword123',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                email: 'testingdasilva@hotmail.com',
                name: 'Test da Silva',
                password: 'a_new_password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to return some error if the new email is already existing in database', async () => {
        await fakeUsersRepository.create({
            name: 'Testing da Silva',
            email: 'existingemail@hotmail.com',
            password: 'testingdasilva123',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Testing da Silva 2',
            email: 'testindasilva2@hotmail.com',
            password: 'testingdasilva123',
        });

        expect(
            updateProfile.execute({
                user_id: user2.id,
                name: 'Testing da Silva 2',
                email: 'existingemail@hotmail.com',
                password: 'testingdasilva123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to renew the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Test da Silva',
            email: 'testingdasilva@hotmail.com',
            password: 'testingdasilva123',
        });

        await updateProfile.execute({
            user_id: user.id,
            name: 'Test da Silva',
            email: 'testingdasilva@hotmail.com',
            old_password: 'testingdasilva123',
            password: 'the-new-password',
        });

        expect(user.password).toBe('the-new-password');
    });

    it('Should be able to return some error if the old password typed does not match', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Test da Silva',
            email: 'testingdasilva@hotmail.com',
            password: 'testingdasilva123',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Test da Silva',
                email: 'testingdasilva@hotmail.com',
                old_password: 'wrong-old-password',
                password: 'the-new-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

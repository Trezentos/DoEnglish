import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('Show Profile Service', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfile = new ShowProfileService(fakeUsersRepository);
    });

    it('Should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Teste da silva',
            email: 'testingdasilva@hotmail.com',
            password: 'randompassword123',
        });

        const returnedUser = await showProfile.execute({ user_id: user.id });

        expect(returnedUser.name).toBe('Teste da silva');
        expect(returnedUser.email).toBe('testingdasilva@hotmail.com');
    });

    it('Should be able to return some error if the user does not exist', async () => {
        await expect(
            showProfile.execute({
                user_id: 'nonexistent-user',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

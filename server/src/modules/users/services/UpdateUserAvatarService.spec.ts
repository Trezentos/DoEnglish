import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('Update User Avatar Service', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });

    it('Should be able to update avatar', async () => {
        const user = await fakeUsersRepository.create({
            email: 'testinguserdasilva@hotmail.com',
            name: 'Testing Silva',
            password: 'randompassword',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.png',
        });

        expect(user.avatar).toBe('avatar.png');
    });

    it('Should not be able to update avatar from a nonx existing user', async () => {
        await expect(
            updateUserAvatar.execute({
                user_id: 'non-existing',
                avatarFilename: 'avatar.png',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to deletd old avatar when updating to a new one', async () => {
        const deletefile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            email: 'testinguserdasilva@hotmail.com',
            name: 'Testing Silva',
            password: 'randompassword',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'image-1.png',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'image-2.png',
        });

        expect(deletefile).toHaveBeenCalledWith('image-1.png');

        expect(user.avatar).toBe('image-2.png');
    });
});

import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('Send forgot password email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'testingdasilva@hotmail.com',
      name: 'Test da Silva',
      password: 'testingpassword123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generatedHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: 'new-password-123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generatedHash).toHaveBeenCalledWith('new-password-123');
    expect(updatedUser?.password).toBe('new-password-123');
  });

  it('It should not be able to reset without user token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123456',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPasswordService.execute({
        password: '1234567',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset password after 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      email: 'testingdasilva@hotmail.com',
      name: 'Test da Silva',
      password: 'testing12345',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '12345',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

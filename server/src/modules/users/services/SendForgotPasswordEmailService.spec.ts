import 'reflect-metadata';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('Send forgot password email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('Should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      email: 'testingsilva@hotmail.com',
      name: 'Test da Silva',
      password: 'silva12345',
    });

    await sendForgotPasswordEmail.execute({
      email: 'testingsilva@hotmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to recover password from an user that does not exist', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'nonexistinguser@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a token from the user reset password request', async () => {
    const createToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    await fakeUsersRepository.create({
      email: 'testingdasilva@hotmail.com',
      name: 'Test da Silva',
      password: 'testingpassword123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'testingdasilva@hotmail.com',
    });

    expect(createToken).toHaveBeenCalled();
  });
});

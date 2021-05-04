import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from '../services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('List Providers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProvidersService = new ListProvidersService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });

    it('Should be able to list appointments from a especific provider', async () => {
        const loggedUser = await fakeUsersRepository.create({
            email: 'loggedUser@hotmail.com',
            name: 'Provider da Silva 1',
            password: 'provider-password',
        });

        const provider1 = await fakeUsersRepository.create({
            email: 'provider1@hotmail.com',
            name: 'Provider da Silva 1',
            password: 'provider-password',
        });

        const provider2 = await fakeUsersRepository.create({
            email: 'provider2@hotmail.com',
            name: 'Provider da Silva 2',
            password: 'provider-password',
        });

        const availableProviders = await listProvidersService.execute({
            except_user_id: loggedUser.id,
        });

        expect(availableProviders).toEqual([provider1, provider2]);
    });
});

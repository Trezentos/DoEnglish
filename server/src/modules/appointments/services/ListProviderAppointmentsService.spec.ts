import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '../services/ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('List Provider Service', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });

    it('Should be able to list appointments from a especific provider', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2021, 5, 11, 12, 0, 0),
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id2',
            date: new Date(2021, 5, 11, 13, 0, 0),
        });

        const appointmentsProvider = await listProviderAppointmentsService.execute(
            {
                provider_id: 'provider-id',
                year: 2021,
                month: 6,
                day: 11,
            },
        );

        expect(appointmentsProvider).toEqual([appointment1, appointment2]);
    });
});

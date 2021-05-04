import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentRepository,
        );
    });

    it('Should be able to list the day availability from provider', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2021, 6, 11, 11).getTime();
        });

        await fakeAppointmentRepository.create({
            date: new Date(2021, 6, 11, 14, 0, 0),
            provider_id: 'provider-id',
            user_id: 'user-id',
        });

        await fakeAppointmentRepository.create({
            date: new Date(2021, 6, 11, 15, 0, 0),
            provider_id: 'provider-id',
            user_id: 'user-id',
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'provider-id',
            year: 2021,
            month: 7, // JAVASCRIPT BEGINS THE MONTH IN 0
            day: 11,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 9, available: false },
                { hour: 12, available: true },
                { hour: 14, available: false },
                { hour: 15, available: false },
            ]),
        );
    });
});

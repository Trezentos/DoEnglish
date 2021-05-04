import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointmentService: CreateAppointmentService;

describe('Create Appointment Service', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        createAppointmentService = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });

    it('Should be able to create an appontment', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointmentService.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'provider-id',
            user_id: 'user-id',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider-id');
    });

    it('Should not be able to create 2 appointments at same time', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await createAppointmentService.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'provider-id',
            user_id: 'user-id',
        });

        await expect(
            createAppointmentService.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: 'provider-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create 2 appointments at same time', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointmentService.execute({
                date: new Date(2020, 4, 10, 10),
                provider_id: 'provider-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able an user to create an appointment with itself.', async () => {
        await expect(
            createAppointmentService.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: 'user-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create an appointment between 8am and 6pm.', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 3).getTime();
        });

        await expect(
            createAppointmentService.execute({
                date: new Date(2020, 4, 10, 5),
                provider_id: 'provider-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointmentService.execute({
                date: new Date(2020, 4, 10, 18),
                provider_id: 'provider-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

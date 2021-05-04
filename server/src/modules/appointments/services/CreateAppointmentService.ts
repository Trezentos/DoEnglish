import { inject, injectable } from 'tsyringe';
import { isBefore, startOfHour, format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    user_id: string;
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentservice {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        date,
        provider_id,
        user_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(new Date(date));

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError(
                'Impossible to create an appointment in past date.',
            );
        }

        if (provider_id === user_id) {
            throw new AppError(
                'Impossible to create an appointment with yourself',
            );
        }

        if (appointmentDate.getHours() < 8 || appointmentDate.getHours() > 17) {
            throw new AppError('Choose a date between 8am and 5pm');
        }

        const findSameAppointmentHour = await this.appointmentsRepository.findByDate(
            appointmentDate,
            provider_id,
        );

        if (findSameAppointmentHour) {
            throw new AppError('This appointment is already booked!');
        }

        const appointment = await this.appointmentsRepository.create({
            date: appointmentDate,
            provider_id,
            user_id,
        });

        await this.cacheProvider.invalidade(
            `providers-appointments:${provider_id}:${format(
                appointmentDate,
                'yyyy-M-d',
            )}`,
        );

        return appointment;
    }
}

export default CreateAppointmentservice;

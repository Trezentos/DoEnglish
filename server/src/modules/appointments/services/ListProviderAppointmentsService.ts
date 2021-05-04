import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        day,
        month,
        year,
        provider_id,
    }: IRequest): Promise<Appointment[]> {
        const cacheKey = `providers-appointments:${provider_id}:${year}-${month}-${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey,
        );

        if (!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayFromProvider(
                {
                    provider_id,
                    day,
                    month,
                    year,
                },
            );

            console.log('Nova busca foi feita!');
            await this.cacheProvider.save(cacheKey, appointments);
        }

        return appointments;
    }
}

export default ListProviderAppointmentsService;

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListPrvoiderDayAvailability {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                year,
                month,
                day,
            },
        );

        const hourStart = 8;

        const eachHourArray = Array.from(
            { length: 10 },
            (_, index) => index + hourStart,
        );

        const currentDay = new Date(Date.now());

        const availability = eachHourArray.map(hour => {
            const hasAppointmentInHour = appointments.find(appointment => {
                return getHours(appointment.date) === hour;
            });

            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                available:
                    !hasAppointmentInHour && isAfter(compareDate, currentDay),
            };
        });

        return availability;
    }
}

export default ListPrvoiderDayAvailability;

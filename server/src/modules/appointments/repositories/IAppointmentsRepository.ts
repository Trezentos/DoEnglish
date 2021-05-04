import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthProvider from '../dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined>;
    findAllInMonthProvider(
        data: IFindAllInMonthProvider,
    ): Promise<Appointment[]>;
    findAllInDayFromProvider(
        data: IFindAllInDayProviderDTO,
    ): Promise<Appointment[]>;
}

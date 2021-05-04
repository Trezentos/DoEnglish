import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import { v4 } from 'uuid';
import IAppointmentRepository from '../IAppointmentsRepository';
import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentRepository {
    private appointments: Appointment[] = [];

    public async create({
        date,
        provider_id,
        user_id,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, {
            id: v4(),
            date,
            provider_id,
            user_id,
        });

        this.appointments.push(appointment);

        return appointment;
    }

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        const foundAppoinnt = this.appointments.find(appointment => {
            return (
                isEqual(appointment.date, date) &&
                appointment.provider_id === provider_id
            );
        });

        return foundAppoinnt;
    }

    public async findAllInMonthProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year &&
                appointment.provider_id === provider_id
            );
        });

        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day,
    }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });

        return appointments;
    }
}

export default FakeAppointmentsRepository;

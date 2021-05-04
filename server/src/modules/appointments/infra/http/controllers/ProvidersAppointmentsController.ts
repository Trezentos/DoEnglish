import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

class ProvidersAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { day, month, year } = request.query;
        const { id: provider_id } = request.user;

        const listProviderAppointments = container.resolve(
            ListProviderAppointmentsService,
        );

        const appointments = await listProviderAppointments.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
            provider_id,
        });

        return response.json(classToClass(appointments));
    }
}

export default ProvidersAppointmentsController;

import { container } from 'tsyringe';
import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';

class ProvidersAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { month, year, day } = request.query;
        const { provider_id } = request.params;

        const listProviderAppointments = container.resolve(
            ListProviderDayAvailability,
        );

        const availability = await listProviderAppointments.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
            day: Number(day),
        });

        return response.json(availability);
    }
}

export default ProvidersAppointmentsController;

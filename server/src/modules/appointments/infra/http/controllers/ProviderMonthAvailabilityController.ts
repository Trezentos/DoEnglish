import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { Request, Response } from 'express';

class ProvidersAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { month, year } = request.query;
        const { provider_id } = request.params;

        const listProviderAppointments = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        const availability = await listProviderAppointments.execute({
            month: Number(month),
            year: Number(year),
            provider_id,
        });

        return response.json(availability);
    }
}

export default ProvidersAppointmentsController;

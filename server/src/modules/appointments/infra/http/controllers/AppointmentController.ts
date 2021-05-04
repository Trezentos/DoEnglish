import CreateAppointmentservice from '@modules/appointments/services/CreateAppointmentService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

class AppointmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;
        const user_id = request.user.id;

        const createAppointment = container.resolve(CreateAppointmentservice);

        const appointment = await createAppointment.execute({
            date,
            provider_id,
            user_id,
        });

        return response.json(appointment);
    }
}

export default AppointmentController;

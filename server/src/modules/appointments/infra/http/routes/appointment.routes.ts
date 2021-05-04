import { Router } from 'express';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import { celebrate, Segments, Joi } from 'celebrate';
import AppointmentController from '../controllers/AppointmentController';
import ProvidersAppointmentsController from '../controllers/ProvidersAppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providersAppointmentsController = new ProvidersAppointmentsController();

appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentController.create,
);
appointmentsRouter.get('/me', providersAppointmentsController.index);

export default appointmentsRouter;

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import { Segments, Joi, celebrate } from 'celebrate';
import { Router } from 'express';

const profileRouter = Router();
const profileCotroller = new ProfileController();

profileRouter.use(ensureAuthentication);

profileRouter.get('/', profileCotroller.show);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required().min(4),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    profileCotroller.update,
);

export default profileRouter;

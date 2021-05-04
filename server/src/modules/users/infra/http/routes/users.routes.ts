import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthentication from '../middlewares/ensureAuthentication';

const upload = multer(uploadConfig.multer);

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    ensureAuthentication,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;

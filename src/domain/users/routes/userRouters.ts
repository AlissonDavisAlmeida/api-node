import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UserController } from '../controllers/UserController';

export const userRouters = Router();
const userController = new UserController();

userRouters.get('/', userController.index);

userRouters.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,

);

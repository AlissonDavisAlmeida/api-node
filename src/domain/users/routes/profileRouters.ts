import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { ProfileController } from "../controllers/ProfileController";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

export const profileRouters = Router();

const profileController = new ProfileController();

profileRouters.use(isAuthenticated);

profileRouters.get("/", profileController.show);

profileRouters.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string().valid(Joi.ref("password")).when("password", {
        is: Joi.exist(),
        then: Joi.required(),
      }),
    },
  }),
  profileController.update,

);

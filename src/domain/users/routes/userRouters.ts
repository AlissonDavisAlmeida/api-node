import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import uploadConfig from "@config/upload.config";
import { UserController } from "../controllers/UserController";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";
import { AvatarController } from "../controllers/AvatarController";

export const userRouters = Router();

const userController = new UserController();
const avatarController = new AvatarController();

const upload = multer(uploadConfig);

userRouters.get("/", isAuthenticated, userController.index);

userRouters.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  avatarController.update,
);

userRouters.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,

);

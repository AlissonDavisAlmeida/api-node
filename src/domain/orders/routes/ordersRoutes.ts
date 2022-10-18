import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { OrdersController } from "../controllers/OrdesController";

export const orderRoutes = Router();

const ordersController = new OrdersController();

orderRoutes.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),

    },
  }),
  ordersController.show,
);

orderRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

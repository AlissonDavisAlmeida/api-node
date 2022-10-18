import { Request, Response } from "express";
import { CreateOrder } from "../services/create-order";
import { ShowOrder } from "../services/showOrder";

export class OrdersController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = new ShowOrder();

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrder();

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
}

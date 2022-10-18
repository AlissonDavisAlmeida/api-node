import { AppError } from "@shared/http/AppError";
import { getCustomRepository } from "typeorm";
import { Order } from "../typeorm/entities/Orders";
import { OrdersRepository } from "../typeorm/repositories/ordersRepository";

interface Request {
  id: string
}

export class ShowOrder {
  private orderRepository: OrdersRepository;

  constructor() {
    this.orderRepository = getCustomRepository(OrdersRepository);
  }

  async execute({ id }: Request): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError("Order not found");
    }

    return order;
  }
}

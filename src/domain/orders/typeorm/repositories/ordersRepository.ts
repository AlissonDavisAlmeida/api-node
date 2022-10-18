import { Customer } from "@domain/customers/typeorm/entities/Customer";
import { Products } from "@domain/products/typeorm/entities/Product";
import { EntityRepository, Repository } from "typeorm";
import { Order } from "../entities/Orders";

interface RequestCreateOrder {
  customer: Customer
  products: Omit<Products, "name" | "created_at" | "updated_at" | "order_products">[]
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne(id, {
      relations: ["customer", "order_products"],
    });

    return order;
  }

  async createOrder({ customer, products }: RequestCreateOrder): Promise<Order> {
    const order = await this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}

import { CustomerRepository } from "@domain/customers/typeorm/repositories/customer-repository";
import { Products } from "@domain/products/typeorm/entities/Product";
import { ProductRepository } from "@domain/products/typeorm/repository/ProductRepository";
import { AppError } from "@shared/http/AppError";
import { getCustomRepository } from "typeorm";
import { Order } from "../typeorm/entities/Orders";
import { OrdersRepository } from "../typeorm/repositories/ordersRepository";

interface Request {
  customer_id: string
  products: Omit<Products, "name" | "created_at" | "updated_at" | "order_products" | "name">[]
}

export class CreateOrder {
  private orderRepository: OrdersRepository;

  private customerRepository: CustomerRepository;

  private productRepository: ProductRepository;

  constructor() {
    this.orderRepository = getCustomRepository(OrdersRepository);
    this.customerRepository = getCustomRepository(CustomerRepository);
    this.productRepository = getCustomRepository(ProductRepository);
  }

  async execute({ customer_id, products }: Request): Promise<Order> {
    const customerExists = await this.customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError("Could not find any customer with the given id");
    }

    const existProducts = await this.productRepository.findAllById(products);

    if (!existProducts) {
      throw new AppError("Could not find any products with the given ids");
    }

    const existProductsIds = existProducts.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !existProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);
    }

    const quantityAvailable = products.filter(
      (product) => existProducts.filter((p) => p.id === product.id)[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`);
    }

    const serializedProducts = products.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      price: existProducts.filter((p) => p.id === product.id)[0].price,
    }));

    const order = await this.orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductsQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity: existProducts.filter((p) => p.id === product.id)[0].quantity - product.quantity,

    }));

    await this.productRepository.save(updatedProductsQuantity);

    return order;
  }
}

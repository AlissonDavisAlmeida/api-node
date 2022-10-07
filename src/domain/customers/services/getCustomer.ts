import { AppError } from "@shared/http/AppError";
import { getCustomRepository } from "typeorm";
import { Customer } from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/customer-repository";

export class GetCustomer {
  private customersRepository: CustomerRepository;

  constructor() {
    this.customersRepository = getCustomRepository(CustomerRepository);
  }

  async execute(id: string): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found");
    }

    return customer;
  }
}

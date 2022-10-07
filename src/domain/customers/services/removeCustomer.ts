import { AppError } from "@shared/http/AppError";
import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../typeorm/repositories/customer-repository";

export class RemoveCustomer {
  private customersRepository: CustomerRepository;

  constructor() {
    this.customersRepository = getCustomRepository(CustomerRepository);
  }

  async execute(id: string): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found");
    }

    await this.customersRepository.remove(customer);
  }
}

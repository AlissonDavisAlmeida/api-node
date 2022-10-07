import { getCustomRepository } from "typeorm";
import { Customer } from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/customer-repository";

export class ShowCustomers {
  private customersRepository: CustomerRepository;

  constructor() {
    this.customersRepository = getCustomRepository(CustomerRepository);
  }

  async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.find();

    return customers;
  }
}

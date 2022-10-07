import { AppError } from "@shared/http/AppError";
import { getCustomRepository } from "typeorm";
import { Customer } from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/customer-repository";

interface IRequest {
  name: string;
  email: string;
}

export class CreateCustomer {
  private customersRepository: CustomerRepository;

  constructor() {
    this.customersRepository = getCustomRepository(CustomerRepository);
  }

  async execute({ name, email }: IRequest): Promise<Customer> {
    const customerExists = await this.customersRepository.findByName(name);

    if (customerExists) {
      throw new AppError("There is already one customer with this name");
    }

    const customer = this.customersRepository.create({ name, email });

    await this.customersRepository.save(customer);

    return customer;
  }
}

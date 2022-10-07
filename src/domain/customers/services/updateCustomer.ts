import { AppError } from "@shared/http/AppError";
import { getCustomRepository } from "typeorm";
import { Customer } from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/customer-repository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export class UpdateCustomer {
  private customersRepository: CustomerRepository;

  constructor() {
    this.customersRepository = getCustomRepository(CustomerRepository);
  }

  async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found");
    }

    const customerExists = await this.customersRepository.findByName(name);

    if (customerExists) {
      throw new AppError("There is already one customer with this name");
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}

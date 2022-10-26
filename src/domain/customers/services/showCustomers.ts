import { getCustomRepository } from "typeorm";
import { Customer } from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/customer-repository";

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  data: Customer[];
}

export class ShowCustomers {
  private customersRepository: CustomerRepository;

  constructor() {
    this.customersRepository = getCustomRepository(CustomerRepository);
  }

  async execute(): Promise<IPaginateCustomer> {
    const customers = await this.customersRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

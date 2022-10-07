import { Request, Response } from "express";
import { CreateCustomer } from "../services/createCustomer";
import { GetCustomer } from "../services/getCustomer";
import { RemoveCustomer } from "../services/removeCustomer";
import { ShowCustomers } from "../services/showCustomers";
import { UpdateCustomer } from "../services/updateCustomer";

export class CustomersController {
  async index(request: Request, response: Response): Promise<Response> {
    const showCustomers = new ShowCustomers();

    const customers = await showCustomers.execute();

    return response.json(customers);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = new CreateCustomer();

    const customer = await createCustomer.execute({
      name,
      email,
    });

    return response.json(customer);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCustomer = new UpdateCustomer();

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = new RemoveCustomer();

    await deleteCustomer.execute(id);

    return response.json([]);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getCustomer = new GetCustomer();

    const customer = await getCustomer.execute(id);

    return response.json(customer);
  }
}

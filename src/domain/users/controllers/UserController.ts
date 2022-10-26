import { Request, Response } from "express";
import { CreateUser } from "../services/createUser";
import { ListUsers } from "../services/listUsers";
import { instanceToInstance } from "class-transformer"

export class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsers();
    const users = await listUsers.execute();

    return response.json(instanceToInstance(users));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUser();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}

import { Request, Response } from "express";
import { CreateUser } from "../services/createUser";
import { ListUsers } from "../services/listUsers";

export class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsers();

    const users = await listUsers.execute();

    return response.json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUser();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}

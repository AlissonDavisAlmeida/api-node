import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import { CreateSession } from "../services/createSession";

export class SessionsController {
  async createSession(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSession();

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}

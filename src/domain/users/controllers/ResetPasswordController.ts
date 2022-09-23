import { Request, Response } from "express";
import { ResetPassword } from "../services/resetPassword";

export class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = new ResetPassword();

    const result = await resetPassword.execute({
      password,
      token,
    });

    return response.status(201).json(result);
  }
}

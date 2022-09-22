import { Request, Response } from "express";
import { SendForgotPassword } from "../services/sendForgotPassword";

export class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPassword = new SendForgotPassword();

    const { message } = await sendForgotPassword.execute({
      email,
    });

    return response.status(202).json(message);
  }
}

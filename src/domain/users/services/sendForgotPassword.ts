import { AppError } from "@shared/http/AppError";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/user-repository";
import { UserTokensRepository } from "../typeorm/repositories/user_tokens-repository";

interface SendForgotPasswordDTO {
  email: string;

}

interface SendForgotPasswordResponse {
  message: string;
}

export class SendForgotPassword {
  private usersRepository: UserRepository;

  private userTokenRepository: UserTokensRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
    this.userTokenRepository = getCustomRepository(UserTokensRepository);
  }

  async execute({ email }: SendForgotPasswordDTO): Promise<SendForgotPasswordResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new AppError("User does not exists");
    }

    const token = await this.userTokenRepository.generate(userAlreadyExists.id);

    if (!token) {
      throw new AppError("Error generating token");
    }

    console.log("🚀 ~ file: sendForgotPassword.ts ~ line 31 ~ SendForgotPassword ~ execute ~ token", token);

    return {
      message: "Token generated",
    };
  }
}

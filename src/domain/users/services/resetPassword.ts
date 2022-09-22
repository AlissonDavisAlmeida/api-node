import { AppError } from "@shared/http/AppError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";
import { UserRepository } from "../typeorm/repositories/user-repository";
import { UserTokensRepository } from "../typeorm/repositories/user_tokens-repository";

interface ResetPasswordDTO {
  token: string;
  password: string;
}

interface ResetPasswordResponse {
  message: string;
}

export class ResetPassword {
  private usersRepository: UserRepository;

  private userTokenRepository: UserTokensRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async execute({ token, password }: ResetPasswordDTO): Promise<ResetPasswordResponse> {
    const tokenExists = await this.userTokenRepository.findByToken(token);

    if (!tokenExists) {
      throw new AppError("Token does not exists");
    }

    const user = await this.usersRepository.findById(tokenExists.user_id);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const tokenCreatedAt = tokenExists.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired");
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);

    return {
      message: "Password reseted",
    };
  }
}

import { AppError } from "@shared/http/AppError";
import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { authConfig } from "@config/auth";
import { User } from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/user-repository";

interface CreateSessionDTO {
  email: string;
  password: string;
}

interface CreateSessionResponse {
  user: User;
  token: string;
}

export class CreateSession {
  private usersRepository: UserRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async execute({ email, password }: CreateSessionDTO): Promise<CreateSessionResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const token = jwt.sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

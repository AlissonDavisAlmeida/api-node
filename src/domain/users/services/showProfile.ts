import { AppError } from "@shared/http/AppError";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/user-repository";

interface IRequest {
  user_id: string;
}

export class ShowProfile {
  private usersRepository: UserRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async execute({ user_id }: IRequest): Promise<User> {
    const users = await this.usersRepository.findById(user_id);

    if (!users) {
      throw new AppError("User not found.");
    }

    return users;
  }
}

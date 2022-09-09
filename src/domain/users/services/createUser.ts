import { AppError } from "@shared/http/AppError";
import { getCustomRepository } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/user-repository";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUser {
  private usersRepository: UserRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = this.usersRepository.create({ name, email, password: passwordHash });
    await this.usersRepository.save(user);

    return user;
  }
}

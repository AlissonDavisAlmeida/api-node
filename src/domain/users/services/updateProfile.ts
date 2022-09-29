import { AppError } from "@shared/http/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/user-repository";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export class UpdateProfile {
  private usersRepository: UserRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async execute({
    user_id, email, name, old_password, password,
  }: IRequest): Promise<User> {
    const users = await this.usersRepository.findById(user_id);

    if (!users) {
      throw new AppError("User not found.");
    }

    const usersUpdateEmail = await this.usersRepository.findByEmail(email);

    if (usersUpdateEmail && usersUpdateEmail.id !== user_id) {
      throw new AppError("There is already one user with this email.");
    }

    if (password && !old_password) {
      throw new AppError("You need to inform the old password to set a new password.");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, users.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match.");
      }

      users.password = await hash(password, 8);
    }

    users.name = name;
    users.email = email;

    await this.usersRepository.save(users);

    return users;
  }
}

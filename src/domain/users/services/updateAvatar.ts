import uploadConfig from "@config/upload.config";
import { AppError } from "@shared/http/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import fs from "fs";
import { User } from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/user-repository";

interface UpdateAvatarDTO {
  avatarFilename: string;
  user_id: string;
}

export class UpdateAvatar {
  private usersRepository: UserRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async execute({ avatarFilename, user_id }: UpdateAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

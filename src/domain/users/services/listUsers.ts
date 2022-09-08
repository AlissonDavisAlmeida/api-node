import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/user-repository';

export class ListUsers {
  private usersRepository: UserRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }
}

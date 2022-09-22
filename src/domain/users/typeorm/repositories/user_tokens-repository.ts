import { Repository, EntityRepository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

@EntityRepository(UserTokens)
export class UserTokensRepository extends Repository<UserTokens> {
  async findByToken(token: string): Promise<UserTokens | undefined> {
    const userTokens = await this.findOne({
      where: { token },
    });
    return userTokens;
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = this.create({
      user_id,
    });
    await this.save(userToken);
    return userToken;
  }
}

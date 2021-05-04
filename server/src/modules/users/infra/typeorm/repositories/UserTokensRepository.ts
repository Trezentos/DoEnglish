import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { Repository, getRepository } from 'typeorm';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async deleteToken(token: string): Promise<boolean> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    if (userToken) {
      await this.ormRepository.remove(userToken);
      return true;
    }

    return false;
  }
}

export default UserTokenRepository;

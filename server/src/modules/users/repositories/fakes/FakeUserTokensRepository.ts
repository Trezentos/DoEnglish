import { v4 } from 'uuid';
import IUserTokenRepository from '../IUserTokensRepository';
import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: v4(),
      token: v4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }

  public async deleteToken(token: string): Promise<boolean> {
    const tokenFound = this.userTokens.find(fToken => fToken.token === token);

    if (tokenFound) {
      this.userTokens.filter(tokenF => tokenF.token !== token);

      return true;
    }

    return false;
  }
}

export default FakeUserTokensRepository;

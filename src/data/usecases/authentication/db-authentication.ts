import { HashComparer } from "src/data/protocols/criptography/hash-compare";
import { TokenGenerator } from "src/data/protocols/criptography/token-generator";
import { LoadAccountByEmailRepository } from "src/data/protocols/db/load-account-by-email-repository";
import { UpdateAccessTokenRepository } from "src/data/protocols/db/update-access-token-repository";
import {
  Authentication,
  AuthenticationModel,
} from "src/domain/usecases/authentication";

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly hashComparerHashComparer: HashComparer;
  private readonly tokenGenerator: TokenGenerator;
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparerHashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparerHashComparer = hashComparerHashComparer;
    this.tokenGenerator = tokenGenerator;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }
  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    );
    if (account) {
      const isValid = await this.hashComparerHashComparer.compare(
        authentication.password,
        account.password
      );
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id);
        await this.updateAccessTokenRepository.update(account.id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}

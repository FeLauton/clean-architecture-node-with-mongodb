import { HashComparer } from "src/data/protocols/criptography/hash-compare";
import { TokenGenerator } from "src/data/protocols/criptography/token-generator";
import { LoadAccountByEmailRepository } from "src/data/protocols/db/load-account-by-email-repository";
import {
  Authentication,
  AuthenticationModel,
} from "src/domain/usecases/authentication";

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly hashComparerHashComparer: HashComparer;
  private readonly tokenGenerator: TokenGenerator;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparerHashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparerHashComparer = hashComparerHashComparer;
    this.tokenGenerator = tokenGenerator;
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
        return accessToken;
      }
    }
    return null;
  }
}

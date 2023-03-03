import { HashComparer } from "src/data/protocols/criptography/hash-compare";
import { LoadAccountByEmailRepository } from "src/data/protocols/db/load-account-by-email-repository";
import {
  Authentication,
  AuthenticationModel,
} from "src/domain/usecases/authentication";

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly hashComparerHashComparer: HashComparer;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparerHashComparer: HashComparer
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparerHashComparer = hashComparerHashComparer;
  }
  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    );
    if (account) {
      await this.hashComparerHashComparer.compare(
        authentication.password,
        account.password
      );
    }
    return null;
  }
}

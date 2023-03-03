import { HashComparer } from "src/data/protocols/criptography/hash-compare";
import { Encrypter } from "src/data/protocols/criptography/encrypter";
import { LoadAccountByEmailRepository } from "src/data/protocols/db/load-account-by-email-repository";
import { UpdateAccessTokenRepository } from "src/data/protocols/db/update-access-token-repository";
import {
  Authentication,
  AuthenticationModel,
} from "src/domain/usecases/authentication";

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly hashComparerHashComparer: HashComparer;
  private readonly encrypter: Encrypter;
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparerHashComparer: HashComparer,
    encrypter: Encrypter,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparerHashComparer = hashComparerHashComparer;
    this.encrypter = encrypter;
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
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.update(account.id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}

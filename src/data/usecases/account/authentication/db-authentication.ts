import { HashComparer } from "../../../protocols/criptography/hash-compare";
import { Encrypter } from "../../../protocols/criptography/encrypter";
import { LoadAccountByEmailRepository } from "../../../protocols/db/account/load-account-by-email-repository";
import { UpdateAccessTokenRepository } from "../../../protocols/db/account/update-access-token-repository";
import {
  Authentication,
  AuthenticationParams,
} from "../../../../domain/usecases/account/authentication";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparerHashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}
  async auth(authentication: AuthenticationParams): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadAccountByEmail(
      authentication.email
    );
    if (account) {
      const isValid = await this.hashComparerHashComparer.compare(
        authentication.password,
        account.password
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        );
        return accessToken;
      }
    }
    return null;
  }
}
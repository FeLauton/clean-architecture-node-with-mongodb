import { Decrypter } from "./../../protocols/criptography/encrypter copy";
import { LoadAccountByTokenRepository } from "./../../protocols/db/account/load-account-by-token-repository";
import { LoadAccountByToken } from "./../../../domain/usecases/load-account-by-token";
import { AccountModel } from "../add-account/db-add-account-protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
    private readonly decrypter: Decrypter
  ) {}
  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken);
    if (token) {
      const account =
        await this.loadAccountByTokenRepository.loadAccountByToken(
          accessToken,
          role
        );
      if (account) {
        return account;
      }
    }
    return null;
  }
}

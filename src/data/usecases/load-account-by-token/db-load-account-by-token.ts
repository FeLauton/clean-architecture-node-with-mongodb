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
    await this.decrypter.decrypt(accessToken);

    return null;
  }
}

import {
  AddAccount,
  AddAccountModel,
  Encrypt,
  AccountModel,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypt: Encrypt;
  constructor(encrypt: Encrypt) {
    this.encrypt = encrypt;
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypt.encrypt(account.password);
    return new Promise<AccountModel>((resolve) => resolve(null));
  }
}

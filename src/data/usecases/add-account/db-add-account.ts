import {
  AddAccount,
  AddAccountModel,
  Encrypt,
  AccountModel,
  AddAccountRepository,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypt: Encrypt;
  private readonly addAccountRepository: AddAccountRepository;
  constructor(encrypt: Encrypt, addAccountRepository: AddAccountRepository) {
    this.encrypt = encrypt;
    this.addAccountRepository = addAccountRepository;
  }
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypt.encrypt(accountData.password);
    await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    );
    return new Promise<AccountModel>((resolve) => resolve(null));
  }
}

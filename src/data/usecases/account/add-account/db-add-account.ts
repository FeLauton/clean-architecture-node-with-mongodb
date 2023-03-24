import {
  AddAccount,
  AddAccountParams,
  Hasher,
  AccountModel,
  AddAccountRepository,
  LoadAccountByEmailRepository,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}
  async add(accountData: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadAccountByEmail(
      accountData.email
    );
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password);
      const newAccount = await this.addAccountRepository.add(
        Object.assign({}, accountData, { password: hashedPassword })
      );
      return newAccount;
    }
    return null;
  }
}
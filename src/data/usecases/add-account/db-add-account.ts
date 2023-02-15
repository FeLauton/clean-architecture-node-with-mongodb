import { AccountModel } from "../../../domain/models/account";
import {
  AddAccount,
  AddAccountModel,
} from "../../../domain/usecases/add-account";
import { Encrypt } from "../../protocols/encrypt";

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

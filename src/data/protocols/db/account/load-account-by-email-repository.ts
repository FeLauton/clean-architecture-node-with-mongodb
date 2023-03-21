import { AccountModel } from "../../../usecases/account/add-account/db-add-account-protocols";

export interface LoadAccountByEmailRepository {
  loadAccountByEmail(email: string): Promise<AccountModel>;
}

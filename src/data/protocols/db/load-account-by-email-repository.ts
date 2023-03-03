import { AccountModel } from "../../usecases/add-account/db-add-account-protocols";

export interface LoadAccountByEmailRepository {
  loadAccountByEmail(email: string): Promise<AccountModel>;
}

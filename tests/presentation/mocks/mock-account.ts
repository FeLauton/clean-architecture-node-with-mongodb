import { AuthenticationModel } from "../../../src/domain/models/authentication";
import { LoadAccountByToken } from "../../../src/domain/usecases/load-account-by-token";
import { mockAccountModel } from "../../domain/mocks";
import { AccountModel } from "./../../../src/domain/models/account";
import {
  AddAccount,
  AddAccountParams,
} from "./../../../src/domain/usecases/add-account";
import {
  Authentication,
  AuthenticationParams,
} from "./../../../src/domain/usecases/authentication";

export const mockAuthentication = () => {
  class AuthenticationStub implements Authentication {
    async auth(
      authentication: AuthenticationParams
    ): Promise<AuthenticationModel> {
      return { accessToken: "any_token", name: "any_name" };
    }
  }
  return new AuthenticationStub();
};

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountStub();
};

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(
      accessToken: string,
      role?: string | undefined
    ): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenStub();
};

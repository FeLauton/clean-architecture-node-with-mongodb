import { mockAccountModel } from "../../domain/tests";
import { LoadAccountByToken } from "../../domain/usecases/account/load-account-by-token";
import {
  Authentication,
  AuthenticationParams,
} from "../controllers/login/login/login-controller-protocols";
import {
  AccountModel,
  AddAccount,
  AddAccountParams,
} from "../controllers/login/signup/signup-controller-protocols";

export const mockAuthentication = () => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationParams): Promise<string> {
      return "any_token";
    }
  }
  return new AuthenticationStub();
};

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return new Promise((resolve) => resolve(mockAccountModel()));
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
      return new Promise<AccountModel>((resolve) =>
        resolve(mockAccountModel())
      );
    }
  }
  return new LoadAccountByTokenStub();
};

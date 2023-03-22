import { AccountModel } from "../../domain/models/account";
import { mockAccountModel } from "../../domain/tests";
import { AddAccountRepository } from "../protocols/db/account/add-account-repository";
import { LoadAccountByTokenRepository } from "../protocols/db/account/load-account-by-token-repository";
import { UpdateAccessTokenRepository } from "../protocols/db/account/update-access-token-repository";
import {
  AddAccountParams,
  LoadAccountByEmailRepository,
} from "../usecases/account/add-account/db-add-account-protocols";

export const mockUpdateAccessTokenRepository =
  (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub
      implements UpdateAccessTokenRepository
    {
      async updateAccessToken(id: string, token: string): Promise<void> {
        return new Promise((resolve) => resolve());
      }
    }
    return new UpdateAccessTokenRepositoryStub();
  };

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountParams): Promise<AccountModel> {
      return new Promise((resolve) => resolve(mockAccountModel()));
    }
  }
  return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      async loadAccountByEmail(email: string): Promise<AccountModel> {
        return new Promise((resolve) => resolve(mockAccountModel()));
      }
    }
    return new LoadAccountByEmailRepositoryStub();
  };

export const mockLoadAccountByTokenRepository =
  (): LoadAccountByTokenRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByTokenRepository
    {
      loadAccountByToken(token: string): Promise<AccountModel> {
        return new Promise<AccountModel>((resolve) =>
          resolve(mockAccountModel())
        );
      }
    }
    return new LoadAccountByEmailRepositoryStub();
  };

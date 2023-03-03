import { LoadAccountByEmailRepository } from "src/data/protocols/load-account-by-email-repository";
import { AccountModel } from "../add-account/db-add-account-protocols";
import { DbAuthentication } from "./db-authentication";

describe("DBAuthentication UseCase", () => {
  test("Should call loadAccountByEmailRepository with correct email", async () => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      async load(email: string): Promise<AccountModel> {
        const account: AccountModel = {
          email: "any_email@mail.com",
          id: "any_id",
          name: "any_name",
          password: "any_password",
        };
        return new Promise((resolve) => resolve(account));
      }
    }
    const loadAccountByEmailRepositoryStub =
      new LoadAccountByEmailRepositoryStub();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "load");

    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);
    await sut.auth({
      email: "any_email@mail.com",
      password: "any_password",
    });
    expect(loadSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});

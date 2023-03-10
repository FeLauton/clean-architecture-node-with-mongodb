import { Decrypter } from "./../../protocols/criptography/encrypter copy";
import { LoadAccountByTokenRepository } from "./../../protocols/db/account/load-account-by-token-repository";
import { LoadAccountByToken } from "./../../../domain/usecases/load-account-by-token";
import { AccountModel } from "./../../../domain/models/account";
import { DbLoadAccountByToken } from "./db-load-account-by-token";

const makeFakeAuthentication = () => ({
  accessToken: "any_token",
  role: "any_role",
});

const makeAccount = (): AccountModel => ({
  email: "any_email@mail.com",
  id: "any_id",
  name: "any_name",
  password: "hashed_password",
});

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("any_value"));
    }
  }
  return new DecrypterStub();
};

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByTokenRepository
  {
    loadAccountByToken(token: string): Promise<AccountModel> {
      return new Promise<AccountModel>((resolve) => resolve(makeAccount()));
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

interface SutTypes {
  sut: LoadAccountByToken;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository;
  decrypterStub: Decrypter;
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository();
  const decrypterStub = makeDecrypter();
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  );
  return {
    sut,
    loadAccountByTokenRepositoryStub,
    decrypterStub,
  };
};

describe("DbLoadAccountByToken UseCase", () => {
  test("Should calls Decrypter with correct values", async () => {
    const { sut, decrypterStub } = makeSut();
    const loadAccountByEmailSpy = jest.spyOn(decrypterStub, "decrypt");
    const { accessToken, role } = makeFakeAuthentication();
    await sut.load(accessToken, role);
    expect(loadAccountByEmailSpy).toHaveBeenCalledWith(accessToken);
  });

  test("Should return null Decrypter returns null", async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, "decrypt").mockReturnValue(null);
    const { accessToken, role } = makeFakeAuthentication();
    const response = await sut.load(accessToken, role);
    expect(response).toBe(null);
  });

  test("Should throw if Decrypter throws", async () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, "decrypt")
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error()))
      );
    const { accessToken, role } = makeFakeAuthentication();
    const promise = sut.load(accessToken, role);
    expect(promise).rejects.toThrow();
  });

  test("Should calls loadAccountByTokenRepository with correct values", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadAccountByEmailSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      "loadAccountByToken"
    );
    const { accessToken, role } = makeFakeAuthentication();
    await sut.load(accessToken, role);
    expect(loadAccountByEmailSpy).toHaveBeenCalledWith(accessToken, role);
  });

  test("Should return null loadAccountByTokenRepository returns null", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, "loadAccountByToken")
      .mockReturnValue(null);
    const { accessToken, role } = makeFakeAuthentication();
    const response = await sut.load(accessToken, role);
    expect(response).toBe(null);
  });

  test("Should throw if loadAccountByTokenRepository throws", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, "loadAccountByToken")
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error()))
      );
    const { accessToken, role } = makeFakeAuthentication();
    const promise = sut.load(accessToken, role);
    expect(promise).rejects.toThrow();
  });

  test("Should DbLoadAccountByToken returns an account on success", async () => {
    const { sut } = makeSut();
    const { accessToken, role } = makeFakeAuthentication();
    const response = await sut.load(accessToken, role);
    expect(response).toEqual(makeAccount());
  });
});

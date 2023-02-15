import { Encrypt } from "../../protocols/encrypt";
import { DbAddAccount } from "./db-add-account";

const makeEncrypt = (): Encrypt => {
  class EncryptStub implements Encrypt {
    async encrypt(value: string): Promise<string> {
      return new Promise<string>((resolve) => resolve("hashed_password"));
    }
  }
  return new EncryptStub();
};

interface SutTypes {
  sut: DbAddAccount;
  encryptStub: Encrypt;
}

const makeSut = (): SutTypes => {
  const encryptStub = makeEncrypt();
  const sut = new DbAddAccount(encryptStub);
  return {
    sut,
    encryptStub,
  };
};

describe("DbAddAccount Usecase", () => {
  test("Should call Encrypt with correct password", async () => {
    const { sut, encryptStub } = makeSut();
    const encryptSpy = jest.spyOn(encryptStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Should throw if Encrypt throws", async () => {
    const { sut, encryptStub } = makeSut();
    jest
      .spyOn(encryptStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
});

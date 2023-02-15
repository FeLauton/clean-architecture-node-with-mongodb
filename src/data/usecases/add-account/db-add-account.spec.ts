import { Encrypt } from "../../protocols/encrypt";
import { DbAddAccount } from "./db-add-account";

interface SutTypes {
  sut: DbAddAccount;
  encryptStub: Encrypt;
}

const makeSut = (): SutTypes => {
  class EncryptStub {
    async encrypt(value: string): Promise<string> {
      return new Promise<string>((resolve) => resolve("hashed_password"));
    }
  }
  const encryptStub = new EncryptStub();
  const sut = new DbAddAccount(encryptStub);
  return {
    sut,
    encryptStub,
  };
};

describe("DbAddAccount Usecase", () => {
  test("Should call Encrypter with correct password", async () => {
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
});

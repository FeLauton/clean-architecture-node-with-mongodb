import { BcryptAdapter } from "./encrypt-adapter";
import bcrypt from "bcrypt";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));

const makeSut = (salt: number): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("should call bcrypt with correct values", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(bcrypt.hash).toHaveBeenCalledWith("any_value", salt);
  });

  test("should return a hash on success", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    const hash = await sut.encrypt("any_value");
    expect(hash).toBe("hash");
  });
});

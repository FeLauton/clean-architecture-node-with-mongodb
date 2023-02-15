import { BcryptAdapter } from "./encrypt-adapter";
import bcrypt from "bcrypt";

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
});

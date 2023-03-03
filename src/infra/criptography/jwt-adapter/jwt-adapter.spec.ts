import { JwtAdapter } from "./jwt-adapter";
import jwt from "jsonwebtoken";

describe("Jwt Adapter", () => {
  test("Should calls sign with correct values", async () => {
    const sut = new JwtAdapter("secret");
    const signSpy = jest.spyOn(jwt, "sign");
    await sut.encrypt("any_id");
    expect(signSpy).toHaveBeenCalledWith({ id: "any_id" }, "secret");
  });
});

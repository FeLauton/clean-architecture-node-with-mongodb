import { badRequest } from "./../../helpers/http-helpers";
import { MissingParamError } from "./../../errors/missing-param-error";
import { LoginController } from "./login";
const makeSut = () => {
  return new LoginController();
};

describe("Login Controller", () => {
  test("should return 400 if no email is provided", async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });
});

import { AuthMiddleware } from "./auth-middleware";
import { AccessDeniedError } from "./../errors/access-denied-error";
import { forbidden } from "./../helpers/http/http-helpers";
describe("Auth Middleware", () => {
  test("should return 403 if no x-access-token exists in headers", async () => {
    const sut = new AuthMiddleware();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
});

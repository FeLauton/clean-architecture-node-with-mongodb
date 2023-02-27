import { badRequest } from "./../../helpers/http-helpers";
import { MissingParamError } from "./../../errors/missing-param-error";
import { Controller, HttpResponse, HttpRequest } from "../../protocols";

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError("email")))
      );
    }
    if (!httpRequest.body.password) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError("password")))
      );
    }
  }
}

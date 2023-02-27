import { InvalidParamError } from "./../../errors/invalid-param-error";
import { EmailValidator } from "./../../protocols/email-validator";
import { badRequest } from "./../../helpers/http-helpers";
import { MissingParamError } from "./../../errors/missing-param-error";
import { Controller, HttpResponse, HttpRequest } from "../../protocols";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;

    if (!email) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError("email")))
      );
    }

    if (!password) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError("password")))
      );
    }

    const isValidEmail = this.emailValidator.isValid(email);
    if (!isValidEmail) {
      return new Promise((resolve) =>
        resolve(badRequest(new InvalidParamError("email")))
      );
    }
  }
}

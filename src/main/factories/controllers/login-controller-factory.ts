import { LoginController } from "../../../presentation/controllers/login-controller";
import { Controller } from "../../../presentation/protocols";
import { makeLogControllerDecorator } from "../decorators/log-controller-decorator-factory";
import { makeDbAuthenticationFactory } from "../usecases/account/authentication/db-authentication-factory";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeDbAuthenticationFactory(),
    makeLoginValidation()
  );
  return makeLogControllerDecorator(controller);
};

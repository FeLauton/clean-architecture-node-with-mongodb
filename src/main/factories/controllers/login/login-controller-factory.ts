import { makeDbAuthenticationFactory } from "../../usecases/authentication/db-authentication-factory";
import { makeLoginValidation } from "./login-validation-factory";
import { LoginController } from "../../../../presentation/controllers/login/login-controller";
import { Controller } from "../../../../presentation/protocols";
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeDbAuthenticationFactory(),
    makeLoginValidation()
  );
  return makeLogControllerDecorator(controller);
};

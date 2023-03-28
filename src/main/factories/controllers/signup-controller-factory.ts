import { SignUpController } from "../../../presentation/controllers/signup-controller";
import { Controller } from "../../../presentation/protocols";
import { makeLogControllerDecorator } from "../decorators/log-controller-decorator-factory";
import { makeDbAddAccountFactory } from "../usecases/account/add-account/db-add-account-factory";
import { makeDbAuthenticationFactory } from "../usecases/account/authentication/db-authentication-factory";
import { makeSignUpValidation } from "./signup-validation-factory";

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccountFactory(),
    makeSignUpValidation(),
    makeDbAuthenticationFactory()
  );
  return makeLogControllerDecorator(controller);
};

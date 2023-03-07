import { AccountMongoRepository } from "./../../../infra/db/mongodb/account/account-mongo-repository";
import { makeLoginValidation } from "./login-validation-factory";
import { DbAuthentication } from "./../../../data/usecases/authentication/db-authentication";
import { LogMongoRepository } from "src/infra/db/mongodb/log/log-mongo-repository";
import { LogControllerDecorator } from "src/main/decorators/log-controller-decorator";
import { LoginController } from "src/presentation/controllers/login/login-controller";
import { Controller } from "src/presentation/protocols";
import { JwtAdapter } from "src/infra/criptography/jwt-adapter/jwt-adapter";
import { BcryptAdapter } from "src/infra/criptography/bcrypt-adapter/encrypt-adapter";
import env from "src/main/config/env";

export const makeLoginController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  );
  const loginController = new LoginController(
    dbAuthentication,
    makeLoginValidation()
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(loginController, logMongoRepository);
};

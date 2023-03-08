import { DbAuthentication } from "../../../../data/usecases/authentication/db-authentication";
import { BcryptAdapter } from "../../../../infra/criptography/bcrypt-adapter/encrypt-adapter";
import { JwtAdapter } from "../../../../infra/criptography/jwt-adapter/jwt-adapter";
import { AccountMongoRepository } from "../../../../infra/db/mongodb/account/account-mongo-repository";
import env from "../../../config/env";
import { Authentication } from "../../../../domain/usecases/authentication";

export const makeDbAuthenticationFactory = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  );
};

import { DbLoadAccountByToken } from "data/usecases/db-load-account-by-token";
import { LoadAccountByToken } from "domain/usecases/load-account-by-token";
import { JwtAdapter } from "infra/criptography/jwt-adapter";
import { AccountMongoRepository } from "infra/db/mongodb/account-mongo-repository";
import env from "main/config/env";

export const makeDbLoadAccountFactory = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};

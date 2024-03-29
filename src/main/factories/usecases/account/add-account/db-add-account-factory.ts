import { DbAddAccount } from "data/usecases/db-add-account";
import { AddAccount } from "domain/usecases/add-account";
import { BcryptAdapter } from "infra/criptography/encrypt-adapter";
import { AccountMongoRepository } from "infra/db/mongodb/account-mongo-repository";

export const makeDbAddAccountFactory = (): AddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository
  );
};

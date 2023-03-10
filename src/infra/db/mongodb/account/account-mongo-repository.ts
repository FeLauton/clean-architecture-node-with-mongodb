import { LoadAccountByTokenRepository } from "./../../../../data/protocols/db/account/load-account-by-token-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountRepository } from "../../../../data/protocols/db/account/add-account-repository";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helpers";
import { LoadAccountByEmailRepository } from "../../../../data/protocols/db/account/load-account-by-email-repository";
import { UpdateAccessTokenRepository } from "../../../../data/protocols/db/account/update-access-token-repository";
import { ObjectId } from "mongodb";

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository
{
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);
    const account = await accountCollection.findOne({
      _id: result.insertedId,
    });
    return MongoHelper.mongoIdMap(account);
  }

  async loadAccountByEmail(email: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const account = await accountCollection.findOne({
      email,
    });
    return account && MongoHelper.mongoIdMap(account);
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection("accounts");
    accountCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { accessToken: token } }
    );
  }

  async loadAccountByToken(
    token: string,
    role?: string
  ): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const account = await accountCollection.findOne({
      accessToken: token,
      role,
    });
    return account && MongoHelper.mongoIdMap(account);
  }
}

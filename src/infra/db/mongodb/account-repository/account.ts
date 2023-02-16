import { AccountModel } from "./../../../../domain/models/account";
import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helpers";

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);
    const account = accountCollection.findOne({
      _id: result.insertedId,
    });
    return MongoHelper.mongoMap<AccountModel>(account);
  }
}

import { MongoHelper } from "../helpers/mongo-helpers";
import { LogErrorRepository } from "../../../../data/protocols/db/log/log-error-repository";

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection("errors");
    await accountCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}

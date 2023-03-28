import { LogErrorRepository } from "../../../data/protocols/db/log/log-error-repository";
import { MongoHelper } from "./mongo-helpers";

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection("errors");
    await accountCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}

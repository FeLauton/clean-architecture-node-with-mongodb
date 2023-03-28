import { Collection } from "mongodb";
import { LogMongoRepository } from "src/infra/db/mongodb/log-mongo-repository";
import { MongoHelper } from "src/infra/db/mongodb/mongo-helpers";
import env from "src/main/config/env";

describe("Log Mongo Repository", () => {
  let errorCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });
  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection("errors");
    await errorCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository();
  };

  test("Should create an error log on success", async () => {
    const sut = makeSut();
    await sut.logError("any_error");
    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});

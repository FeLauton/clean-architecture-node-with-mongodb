import { Collection } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helpers";
import { AccountMongoRepository } from "./account-mongo-repository";

let accountCollection: Collection;

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  test("Should return an account on add success", async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@mail.com");
    expect(account.password).toBe("any_password");
  });

  test("Should return an account on loadAccountByEmail success", async () => {
    const sut = makeSut();
    await accountCollection.insertOne({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });
    const account = await sut.loadAccountByEmail("any_email@mail.com");
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@mail.com");
    expect(account.password).toBe("any_password");
  });

  test("Should return null if loadAccountByEmail fails", async () => {
    const sut = makeSut();
    const account = await sut.loadAccountByEmail("any_email@mail.com");
    expect(account).toBeFalsy();
  });

  test("Should update the account accessToken on updateAccessToken", async () => {
    const sut = makeSut();
    const { insertedId } = await accountCollection.insertOne({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });
    let account = await accountCollection.findOne({ _id: insertedId });
    expect(account.accessToken).toBeFalsy();
    await sut.updateAccessToken(insertedId.toHexString(), "any_token");
    account = await accountCollection.findOne({ _id: insertedId });
    expect(account).toBeTruthy();
    expect(account.accessToken).toBe("any_token");
  });
});
import { Collection } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helpers";
import { AccountMongoRepository } from "./account-mongo-repository";
import { ObjectId } from "mongodb";

let accountCollection: Collection;

const makeAccountId = async (
  accessToken?: string,
  role?: string
): Promise<string> => {
  const insertedAccount = await accountCollection.insertOne({
    name: "any_name",
    email: "any_email@mail.com",
    password: "any_password",
    accessToken,
    role,
  });
  return insertedAccount.insertedId.toHexString();
};

const findOneAccountById = async (accountId: string) => {
  return await accountCollection.findOne({
    _id: new ObjectId(accountId),
  });
};

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

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

  describe("add()", () => {
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
  });

  describe("loadAccountByEmail()", () => {
    test("Should return an account on loadAccountByEmail success", async () => {
      const sut = makeSut();
      await makeAccountId();
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
  });

  describe("updateAccessToken()", () => {
    test("Should update the account accessToken on updateAccessToken", async () => {
      const sut = makeSut();
      const accountId = await makeAccountId();
      let account = await findOneAccountById(accountId);
      expect(account?.accessToken).toBeFalsy();
      await sut.updateAccessToken(accountId, "any_token");
      account = await findOneAccountById(accountId);
      expect(account).toBeTruthy();
      expect(account?.accessToken).toBe("any_token");
    });
  });

  describe("loadAccountByToken()", () => {
    test("Should return an account on loadAccountByToken success without role", async () => {
      const sut = makeSut();
      await makeAccountId("any_token");
      const account = await sut.loadAccountByToken("any_token");
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });

    test("Should return an account on loadAccountByToken success with admin token", async () => {
      const sut = makeSut();
      await makeAccountId("any_token", "admin");
      const account = await sut.loadAccountByToken("any_token", "admin");
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });

    test("Should return an account on loadAccountByToken if user is admin", async () => {
      const sut = makeSut();
      await makeAccountId("any_token", "admin");
      const account = await sut.loadAccountByToken("any_token", "any_token");
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });

    test("Should return null on loadAccountByToken success with invalid token", async () => {
      const sut = makeSut();
      await makeAccountId("any_token");
      const account = await sut.loadAccountByToken("any_token", "admin");
      expect(account).toBeFalsy();
    });

    test("Should return null if loadAccountByToken fails", async () => {
      const sut = makeSut();
      const account = await sut.loadAccountByToken("any_token");
      expect(account).toBeFalsy();
    });
  });
});

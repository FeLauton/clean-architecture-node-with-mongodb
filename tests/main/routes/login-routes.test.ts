import { hash } from "bcrypt";
import { MongoHelper } from "infra/db/mongodb/mongo-helpers";
import app from "main/config/app";
import env from "main/config/env";
import { Collection } from "mongodb";
import request from "supertest";

let accountCollection: Collection;

describe("Login Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe("POST /signup", () => {
    test("Should return 200 on signup", async () => {
      await request(app)
        .post("/api/signup")
        .send({
          name: "Fellipe",
          email: "fellipe.lauton@gmail.com",
          password: "123",
          passwordConfirmation: "123",
        })
        .expect(200);
    });
  });
  describe("POST /login", () => {
    test("Should return 200 on login", async () => {
      const hashedPassword = await hash("123", 12);
      await accountCollection.insertOne({
        name: "Fellipe",
        email: "fellipe.lauton@gmail.com",
        password: hashedPassword,
      });
      await request(app)
        .post("/api/login")
        .send({
          email: "fellipe.lauton@gmail.com",
          password: "123",
        })
        .expect(200);
    });

    test("Should return 401 whit invalid credentials", async () => {
      await request(app)
        .post("/api/login")
        .send({
          email: "fellipe.lauton@gmail.com",
          password: "123",
        })
        .expect(401);
    });
  });
});

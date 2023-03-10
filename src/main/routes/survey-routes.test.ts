import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Collection } from "mongodb";
import env from "../config/env";
import request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helpers";
import app from "../config/app";

let surveyCollection: Collection;
let accountCollection: Collection;

describe("Survey Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    accountCollection = await MongoHelper.getCollection("accounts");
    await surveyCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe("POST /survey", () => {
    test("Should return 403 on add survey without accessToken", async () => {
      await request(app)
        .post("/api/surveys")
        .send({
          question: "Question 1 ",
          answers: [
            {
              answer: "Answer 1",
              image: "http://bucket/images/image-name.com",
            },
            {
              answer: "Answer 2",
            },
          ],
        })
        .expect(403);
    });

    test("Should return 204 on add survey without accessToken", async () => {
      const hashedPassword = await hash("123", 12);
      const { insertedId } = await accountCollection.insertOne({
        name: "Fellipe",
        email: "fellipe.lauton@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      const accessToken = sign({ id: insertedId.toHexString() }, env.jwtSecret);
      await accountCollection.updateOne(
        { _id: insertedId },
        {
          $set: {
            accessToken,
          },
        }
      );
      await request(app)
        .post("/api/surveys")
        .set("x-access-token", accessToken)
        .send({
          question: "Question 1 ",
          answers: [
            {
              answer: "Answer 1",
              image: "http://bucket/images/image-name.com",
            },
            {
              answer: "Answer 2",
            },
          ],
        })
        .expect(204);
    });
  });
});

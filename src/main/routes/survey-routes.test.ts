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

  describe("POST /surveys", () => {
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

    test("Should return 204 on add survey with accessToken", async () => {
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

  describe("GET /surveys", () => {
    test("Should return 403 on load surveys without accessToken", async () => {
      await request(app).get("/api/surveys").send().expect(403);
    });

    test("Should return 200 on load surveys with accessToken", async () => {
      const hashedPassword = await hash("123", 12);
      const { insertedId } = await accountCollection.insertOne({
        name: "Fellipe",
        email: "fellipe.lauton@gmail.com",
        password: hashedPassword,
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
      await surveyCollection.insertMany([
        {
          question: "any_question",
          answers: [{ image: "any_image", answer: "any_answer" }],
          date: new Date(),
        },
      ]);
      await request(app)
        .get("/api/surveys")
        .set("x-access-token", accessToken)
        .expect(200);
    });
  });
});

import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Collection } from "mongodb";
import request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helpers";
import app from "../config/app";
import env from "../config/env";

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccessToken = async (): Promise<string> => {
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
  return accessToken;
};

const makeFakeSurvey = async (): Promise<string> => {
  const survey = await surveyCollection.insertOne({
    id: "any_id",
    question: "any_question",
    answers: [
      {
        answer: "Answer 1",
        image: "http://bucket/images/image-name.com",
      },
      {
        answer: "Answer 2",
      },
    ],
    date: new Date(),
  });
  return survey.insertedId.toHexString();
};

describe("Survey Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    accountCollection = await MongoHelper.getCollection("accounts");
    await surveyCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe("PUT /surveys/:surveyId/results", () => {
    test("Should return 403 on load surveys results without accessToken", async () => {
      await request(app)
        .put("/api/surveys/any_id/results")
        .send({ answer: "any_answer" })
        .expect(403);
    });

    test("Should return 200 on save survey result with a valid accessToken", async () => {
      const accessToken = await makeAccessToken();
      const surveyId = await makeFakeSurvey();
      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set("x-access-token", accessToken)
        .send({ answer: "Answer 1" })
        .expect(200);
    });
  });
  describe("GET /surveys/:surveyId/results", () => {
    test("Should return 403 on load surveys results without accessToken", async () => {
      await request(app).get("/api/surveys/any_id/results").expect(403);
    });

    test("Should return 200 on load survey result with a valid accessToken", async () => {
      const accessToken = await makeAccessToken();
      const surveyId = await makeFakeSurvey();
      await request(app)
        .get(`/api/surveys/${surveyId}/results`)
        .set("x-access-token", accessToken)
        .expect(200);
    });
  });
});

import { Collection } from "mongodb";
import request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helpers";
import app from "../config/app";

let surveyCollection: Collection;

describe("Survey Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe("POST /survey", () => {
    test("Should return 204 on survey", async () => {
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
        .expect(204);
    });
  });
});

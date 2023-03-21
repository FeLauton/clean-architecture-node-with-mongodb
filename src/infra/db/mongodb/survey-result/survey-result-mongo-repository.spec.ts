import { Collection } from "mongodb";
import { SurveyModel } from "../../../../domain/models/survey";
import { MongoHelper } from "../helpers/mongo-helpers";
import { SaveSurveyResultMongoRepository } from "./survey-result-mongo-repository";

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSurveyId = async (): Promise<string> => {
  const insertedSurvey = await surveyCollection.insertOne({
    question: "any_question",
    answers: [{ image: "any_image", answer: "any_answer" }],
    date: new Date(),
  });
  return insertedSurvey.insertedId.toHexString();
};

const makeSurveyResultId = async ({ surveyId, accountId }): Promise<string> => {
  const insertedSurveyResult = await surveyResultCollection.insertOne({
    accountId,
    answer: "any_answer",
    surveyId,
    date: new Date(),
  });
  return insertedSurveyResult.insertedId.toHexString();
};

const makeAccountId = async (): Promise<string> => {
  const insertedAccount = await accountCollection.insertOne({
    name: "any_name",
    email: "any_email@mail.com",
    password: "any_password",
  });
  return insertedAccount.insertedId.toHexString();
};

const makeSut = (): SaveSurveyResultMongoRepository => {
  return new SaveSurveyResultMongoRepository();
};

describe("SurveyResultMongoRepository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });
  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    accountCollection = await MongoHelper.getCollection("accounts");
    surveyResultCollection = await MongoHelper.getCollection("surveyResults");
    await surveyCollection.deleteMany({});
    await surveyResultCollection.deleteMany({});
    await accountCollection.deleteMany({});
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe("save()", () => {
    test("Should add a survey result if its new", async () => {
      const sut = makeSut();
      const accountId = await makeAccountId();
      const surveyId = await makeSurveyId();
      const surveyResult = await sut.save({
        accountId,
        answer: "any_answer",
        surveyId,
        date: new Date(),
      });
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toBeTruthy();
      expect(surveyResult.answer).toBe("any_answer");
    });

    test("Should add a survey result if its not new", async () => {
      const accountId = await makeAccountId();
      const surveyId = await makeSurveyId();
      const surveyResultId = await makeSurveyResultId({ accountId, surveyId });
      const sut = makeSut();
      const surveyResult = await sut.save({
        accountId,
        answer: "renew_any_answer",
        surveyId,
        date: new Date(),
      });
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toEqual(surveyResultId);
      expect(surveyResult.answer).toBe("renew_any_answer");
    });
  });
});

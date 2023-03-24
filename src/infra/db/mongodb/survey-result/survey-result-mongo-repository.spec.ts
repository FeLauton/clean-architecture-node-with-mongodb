import { Collection, ObjectId } from "mongodb";
import { SurveyModel } from "../../../../domain/models/survey";
import env from "../../../../main/config/env";
import { MongoHelper } from "../helpers/mongo-helpers";
import { mockAddAccountParams } from "./../../../../domain/tests/mock-account";
import { mockAddSurveyParams } from "./../../../../domain/tests/mock-survey";
import { SaveSurveyResultMongoRepository } from "./survey-result-mongo-repository";

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const mockSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne(mockAddSurveyParams());
  const survey = await surveyCollection.findOne({ _id: res.insertedId });
  return MongoHelper.mongoIdMap(survey);
};

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams());
  return res.insertedId.toHexString();
};

const makeSut = (): SaveSurveyResultMongoRepository => {
  return new SaveSurveyResultMongoRepository();
};

describe("SurveyResultMongoRepository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
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
      const survey = await mockSurvey();
      const accountId = await mockAccountId();
      const sut = makeSut();
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: new Date(),
      });
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
      });
      expect(surveyResult).toBeTruthy();
    });

    test("Should update survey result if its not new", async () => {
      const survey = await mockSurvey();
      const accountId = await mockAccountId();
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date(),
      });
      const sut = makeSut();
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[1].answer,
        date: new Date(),
      });
      const surveyResult = await surveyResultCollection
        .find({
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(accountId),
        })
        .toArray();
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.length).toBe(1);
    });
  });
});

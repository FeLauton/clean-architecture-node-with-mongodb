import { Collection, ObjectId } from "mongodb";
import { MongoHelper } from "../../../../src/infra/db/mongodb/mongo-helpers";
import { SurveyMongoRepository } from "../../../../src/infra/db/mongodb/survey-mongo-repository";
import env from "../../../../src/main/config/env";
import {
  mockAddAccountParams,
  mockAddSurveyParams,
} from "../../../domain/mocks";

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams());
  return res.insertedId.toHexString();
};

let surveyCollection: Collection;
let accountCollection: Collection;
let surveyResultCollection: Collection;

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

describe("SurveyMongoRepository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
    surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.deleteMany({});
    surveyResultCollection = await MongoHelper.getCollection("surveyResults");
    await surveyResultCollection.deleteMany({});
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe("add()", () => {
    test("Should return an 204 on add success", async () => {
      const sut = makeSut();
      await sut.add(mockAddSurveyParams());
      const survey = await surveyCollection.findOne({
        question: "any_question",
      });
      expect(survey).toBeTruthy();
    });
  });

  describe("loadAll()", () => {
    test("Should load all surveys on success", async () => {
      const sut = makeSut();
      const accountId = await mockAccountId();
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()];
      await surveyCollection.insertMany(addSurveyModels);
      let survey = await surveyCollection.findOne({});
      await surveyResultCollection.insertOne({
        accountId: new ObjectId(accountId),
        surveyId: survey?._id,
        answers: survey?.answers[0].answer,
        date: new Date(),
      });
      const surveys = await sut.loadAll(accountId);
      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].question).toBe(addSurveyModels[0].question);
      expect(surveys[0].didAnswer).toBe(true);
      expect(surveys[1].question).toBe(addSurveyModels[1].question);
      expect(surveys[1].didAnswer).toBe(false);
    });

    test("Should load a empty list", async () => {
      const sut = makeSut();
      const accountId = await mockAccountId();
      const surveys = await sut.loadAll(accountId);
      expect(surveys.length).toBe(0);
    });
  });

  describe("loadById()", () => {
    test("Should load survey on success", async () => {
      const sut = makeSut();
      const insertedSurvey = await surveyCollection.insertOne(
        mockAddSurveyParams()
      );
      const id = insertedSurvey.insertedId.toHexString();
      const survey = await sut.loadById(id);
      expect(survey).toBeTruthy();
    });
  });
});

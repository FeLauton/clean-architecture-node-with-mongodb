import { Collection } from "mongodb";
import env from "../../../../main/config/env";
import { MongoHelper } from "../helpers/mongo-helpers";
import { mockAddSurveyParams } from "./../../../../domain/tests/mock-survey";
import { SurveyMongoRepository } from "./survey-mongo-repository";

let surveyCollection: Collection;

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

describe("SurveyMongoRepository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });
  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.deleteMany({});
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
      await surveyCollection.insertMany([
        mockAddSurveyParams(),
        mockAddSurveyParams(),
      ]);
      const surveys = await sut.loadAll();
      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].question).toBe("any_question");
      expect(surveys[1].question).toBe("any_question");
    });

    test("Should load a empty list", async () => {
      const sut = makeSut();
      const surveys = await sut.loadAll();
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

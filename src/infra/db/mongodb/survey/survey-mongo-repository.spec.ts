import { Collection } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helpers";
import { SurveyMongoRepository } from "./survey-mongo-repository";

let surveyCollection: Collection;

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

describe("SurveyMongoRepository", () => {
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

  describe("add()", () => {
    test("Should return an 204 on add success", async () => {
      const sut = makeSut();
      await sut.add({
        question: "any_question",
        answers: [
          { image: "any_image", answer: "any_answer" },
          { answer: "other_answer" },
        ],
        date: new Date(),
      });
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
        {
          question: "any_question",
          answers: [{ image: "any_image", answer: "any_answer" }],
          date: new Date(),
        },
        {
          question: "other_question",
          answers: [{ image: "other_image", answer: "other_answer" }],
          date: new Date(),
        },
      ]);
      const surveys = await sut.loadAll();
      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].question).toBe("any_question");
      expect(surveys[1].question).toBe("other_question");
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
      const insertedSurvey = await surveyCollection.insertOne({
        question: "any_question",
        answers: [{ image: "any_image", answer: "any_answer" }],
        date: new Date(),
      });
      const id = insertedSurvey.insertedId.toHexString();
      const survey = await sut.loadById(id);
      expect(survey).toBeTruthy();
    });
  });
});

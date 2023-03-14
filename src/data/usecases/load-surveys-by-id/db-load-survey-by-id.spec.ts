import { DbLoadSurveyById } from "./db-load-survey-by-id";
import { LoadSurveyByIdRepository } from "../../protocols/db/survey/load-survey-by-id-repository";
import { SurveyModel } from "../../../domain/models/survey";
import MockDate from "mockdate";

const makeFakeSurvey = (): SurveyModel => ({
  id: "any_id",
  question: "any_question",
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
  ],
  date: new Date(),
});

const makeLoadSurveysRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyByIdRepository {
    loadById(): Promise<SurveyModel> {
      return new Promise<SurveyModel>((resolve) => resolve(makeFakeSurvey()));
    }
  }
  return new LoadSurveyRepositoryStub();
};

interface SutTypes {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveysRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe("DbLoadSurveyById", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  test("Should calls loadSurveyById with correct id", async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, "loadById");
    await sut.loadById("any_id");
    expect(loadByIdSpy).toHaveBeenCalledWith("any_id");
  });

  test("Should throw if loadSurveyById throws", async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositoryStub, "loadById")
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.loadById("");
    expect(promise).rejects.toThrow();
  });
});

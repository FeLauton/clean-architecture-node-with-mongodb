import { SurveyModel } from "./../../../../domain/models/survey";
import { LoadSurveyRepository } from "../../../protocols/db/survey/load-survey-repository";
import { DbLoadSurveys } from "./db-load-surveys";
import MockDate from "mockdate";

const makeFakeSurveys = (): SurveyModel[] => [
  {
    id: "any_id",
    question: "any_question",
    answers: [
      {
        image: "any_image",
        answer: "any_answer",
      },
    ],
    date: new Date(),
  },
  {
    id: "other_id",
    question: "other_question",
    answers: [
      {
        image: "other_image",
        answer: "other_answer",
      },
    ],
    date: new Date(),
  },
];

const makeLoadSurveysRepository = (): LoadSurveyRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyRepository {
    loadAll(): Promise<SurveyModel[]> {
      return new Promise<SurveyModel[]>((resolve) =>
        resolve(makeFakeSurveys())
      );
    }
  }
  return new LoadSurveyRepositoryStub();
};

interface SutTypes {
  sut: DbLoadSurveys;
  loadSurveysStub: LoadSurveyRepository;
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysStub);
  return {
    sut,
    loadSurveysStub,
  };
};

describe("DbLoadSurveys UseCase", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  test("Should calls loadSurveys", async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysStub, "loadAll");
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test("Should throw if loadSurveys throws", async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, "loadAll")
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.load();
    expect(promise).rejects.toThrow();
  });

  test("Should DbLoadSurveys a list of surveys on success", async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();
    expect(surveys).toEqual(makeFakeSurveys());
  });
});

import MockDate from "mockdate";
import { LoadSurveyRepository } from "../../../protocols/db/survey/load-survey-repository";
import { mockLoadSurveysRepository } from "../../../tests";
import { mockSurveyModels, throwError } from "./../../../../domain/tests";
import { DbLoadSurveys } from "./db-load-surveys";

interface SutTypes {
  sut: DbLoadSurveys;
  loadSurveysStub: LoadSurveyRepository;
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveysRepository();
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
    jest.spyOn(loadSurveysStub, "loadAll").mockImplementationOnce(throwError);
    const promise = sut.load();
    expect(promise).rejects.toThrow();
  });

  test("Should DbLoadSurveys a list of surveys on success", async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();
    expect(surveys).toEqual(mockSurveyModels());
  });
});

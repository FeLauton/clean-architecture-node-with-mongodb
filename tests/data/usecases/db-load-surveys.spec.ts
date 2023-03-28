import { LoadSurveyRepository } from "data/protocols/db/survey/load-survey-repository";
import { DbLoadSurveys } from "data/usecases/db-load-surveys";
import MockDate from "mockdate";
import { mockLoadSurveysRepository } from "tests/data/mocks";
import { mockSurveyModels, throwError } from "tests/domain/mocks";

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
    await sut.load("any_id");
    expect(loadAllSpy).toHaveBeenCalledWith("any_id");
  });

  test("Should throw if loadSurveys throws", async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, "loadAll").mockImplementationOnce(throwError);
    const promise = sut.load("any_id");
    expect(promise).rejects.toThrow();
  });

  test("Should DbLoadSurveys a list of surveys on success", async () => {
    const { sut } = makeSut();
    const surveys = await sut.load("any_id");
    expect(surveys).toEqual(mockSurveyModels());
  });
});

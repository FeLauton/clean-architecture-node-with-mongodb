import MockDate from "mockdate";
import { DbLoadSurveyResult } from "../../../src/data/usecases/db-load-survey-result";
import {
  LoadSurveyByIdRepository,
  LoadSurveyResultRepository,
} from "../../../src/data/usecases/db-load-survey-result-protocols";
import { mockSurveyResultModel, throwError } from "../../domain/mocks";
import {
  mockLoadSurveyByIdRepository,
  mockLoadSurveyResultRepository,
} from "../mocks";

interface SutTypes {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  );
  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  };
};

describe("DbLoadSurveyResult", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  test("Should call LoadSurveyResultRepository with correct values", async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      "loadBySurveyId"
    );
    await sut.load("any_survey_id", "any_account_id");
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(
      "any_survey_id",
      "any_account_id"
    );
  });

  test("Should throw if LoadSurveyResultRepository throws", async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, "loadBySurveyId")
      .mockImplementationOnce(throwError);
    const promise = sut.load("any_survey_id", "any_account_id");
    expect(promise).rejects.toThrow();
  });

  test("Should call LoadSurveyByIdRepository id LoadSurveyResultRepository returns null", async () => {
    const {
      sut,
      loadSurveyByIdRepositoryStub,
      loadSurveyResultRepositoryStub,
    } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, "loadById");
    jest
      .spyOn(loadSurveyResultRepositoryStub, "loadBySurveyId")
      .mockReturnValueOnce(Promise.resolve(null));
    await sut.load("any_survey_id", "any_account_id");
    expect(loadByIdSpy).toHaveBeenCalledWith("any_survey_id");
  });

  test("Should return surveyResultModel with all answers with count 0 if loadSurveyResultRepository returns null", async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, "loadBySurveyId")
      .mockReturnValueOnce(Promise.resolve(null));
    const surveyResult = await sut.load("any_survey_id", "any_account_id");
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });

  test("Should return survey result on success", async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.load("any_survey_id", "any_account_id");
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});

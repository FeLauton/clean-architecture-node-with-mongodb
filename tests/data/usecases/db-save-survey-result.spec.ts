import MockDate from "mockdate";
import { DbSaveSurveyResult } from "src/data/usecases/db-save-survey-result";
import {
  LoadSurveyResultRepository,
  SaveSurveyResultRepository,
} from "src/data/usecases/db-save-survey-result-protocols";
import {
  mockLoadSurveyResultRepository,
  mockSaveSurveyResultRepository,
} from "tests/data/mocks";
import {
  mockSaveSurveyResultParams,
  mockSurveyResultModel,
  throwError,
} from "tests/domain/mocks";

interface SutTypes {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub
  );
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  };
};

describe("DbSaveSurveyResult", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  test("Should call SaveSurveyResultRepository with correct values", async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, "save");
    const surveyData = mockSaveSurveyResultParams();
    await sut.save(surveyData);
    expect(saveSpy).toHaveBeenCalledWith(surveyData);
  });

  test("Should throw if SaveSurveyResultRepository throws", async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(saveSurveyResultRepositoryStub, "save")
      .mockImplementationOnce(throwError);
    const promise = sut.save(mockSaveSurveyResultParams());
    expect(promise).rejects.toThrow();
  });

  test("Should call LoadSurveyResultRepository with correct values", async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      "loadBySurveyId"
    );
    const surveyData = mockSaveSurveyResultParams();
    await sut.save(surveyData);
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
    const promise = sut.save(mockSaveSurveyResultParams());
    expect(promise).rejects.toThrow();
  });

  test("Should return survey result on success", async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(mockSaveSurveyResultParams());
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});

import { throwError } from "../../../../domain/tests";
import { mockSurveyResultModel } from "./../../../../domain/tests/mock-survey-result";
import { mockLoadSurveyResultRepository } from "./../../../tests/mock-db-survey-result";
import { DbLoadSurveyResult } from "./db-load-survey-result";
import { LoadSurveyResultRepository } from "./db-load-survey-result-protocols";

interface SutTypes {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);
  return {
    sut,
    loadSurveyResultRepositoryStub,
  };
};

describe("DbLoadSurveyResult", () => {
  test("Should call LoadSurveyResultRepository with correct values", async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      "loadBySurveyId"
    );
    await sut.load("any_survey_id");
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith("any_survey_id");
  });

  test("Should throw if LoadSurveyResultRepository throws", async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, "loadBySurveyId")
      .mockImplementationOnce(throwError);
    const promise = sut.load("any_survey_id");
    expect(promise).rejects.toThrow();
  });

  test("Should return survey result on success", async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.load("any_survey_id");
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});

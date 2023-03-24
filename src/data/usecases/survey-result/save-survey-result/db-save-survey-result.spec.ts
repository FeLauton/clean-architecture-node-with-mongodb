import MockDate from "mockdate";
import {
  mockSaveSurveyResultParams,
  mockSurveyResultModel,
  throwError,
} from "../../../../domain/tests";
import { mockSaveSurveyResultRepository } from "./../../../tests";
import { DbSaveSurveyResult } from "./db-save-survey-result";
import { SaveSurveyResultRepository } from "./db-save-survey-result-protocols";

interface SutTypes {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub,
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

  test("Should return survey result on success", async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(mockSaveSurveyResultParams());
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});

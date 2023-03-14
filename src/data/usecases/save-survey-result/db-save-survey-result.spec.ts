import {
  SaveSurveyResultRepository,
  SaveSurveyResultModel,
  SurveyResultModel,
} from "./db-save-survey-result-protocols";
import { DbSaveSurveyResult } from "./db-save-survey-result";
import MockDate from "mockdate";

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: "any_id",
  surveyId: "any_survey_id",
  accountId: "any_account_id",
  answer: "any_answer",
  date: new Date(),
});
const makeFakeSurveyResultData = (): SaveSurveyResultModel => {
  const { id, ...rest } = makeFakeSurveyResult();
  return rest;
};

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise((resolve) => resolve(makeFakeSurveyResult()));
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

interface SutTypes {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository();
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
    const surveyData = makeFakeSurveyResultData();
    await sut.save(surveyData);
    expect(saveSpy).toHaveBeenCalledWith(surveyData);
  });
});

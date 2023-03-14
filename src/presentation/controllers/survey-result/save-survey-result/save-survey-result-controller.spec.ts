import { SaveSurveyResultController } from "./save-survey-result-controller";
import {
  HttpRequest,
  SaveSurveyResult,
  SaveSurveyResultModel,
  SurveyResultModel,
} from "./save-survey-result-controller-protocols";
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

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeSurveyResultData(),
});

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise((resolve) => resolve(makeFakeSurveyResult()));
    }
  }
  return new SaveSurveyResultStub();
};

interface SutTypes {
  sut: SaveSurveyResultController;
  saveSurveyResultStub: SaveSurveyResult;
}

const makeSut = (): SutTypes => {
  const saveSurveyResultStub = makeSaveSurveyResult();
  const sut = new SaveSurveyResultController(saveSurveyResultStub);
  return {
    sut,
    saveSurveyResultStub,
  };
};

describe("SaveSurveyResultController", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  test("Should calls SaveSurveyResult with correct values", async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultStub, "save");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(saveSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});

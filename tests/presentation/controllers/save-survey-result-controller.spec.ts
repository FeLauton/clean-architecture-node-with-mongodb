import { LoadSurveyById } from "domain/usecases/load-surveys-by-id";
import { SaveSurveyResult } from "domain/usecases/save-survey-result";
import MockDate from "mockdate";
import { SaveSurveyResultController } from "presentation/controllers/save-survey-result-controller";
import { InvalidParamError } from "presentation/errors/invalid-param-error";
import {
  forbidden,
  ok,
  serverError,
} from "presentation/helpers/http/http-helpers";
import { HttpRequest } from "presentation/protocols/http";
import {
  mockSaveSurveyResultParams,
  mockSurveyResultModel,
  throwError,
} from "tests/domain/mocks";
import {
  mockLoadSurveyById,
  mockSaveSurveyResult,
} from "tests/presentation/mocks";

const mockFakeRequest = (): HttpRequest => ({
  accountId: "any_account_id",
  body: mockSaveSurveyResultParams(),
  params: { surveyId: "any_survey_id" },
});

interface SutTypes {
  sut: SaveSurveyResultController;
  saveSurveyResultStub: SaveSurveyResult;
  loadSurveyByIdStub: LoadSurveyById;
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const saveSurveyResultStub = mockSaveSurveyResult();
  const sut = new SaveSurveyResultController(
    loadSurveyByIdStub,
    saveSurveyResultStub
  );
  return {
    sut,
    loadSurveyByIdStub,
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

  test("Should calls LoadSurveyById with correct values", async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, "loadById");
    await sut.handle(mockFakeRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith("any_survey_id");
  });

  test("Should return 403 if LoadSurveyById returns null", async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, "loadById")
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError("surveyId")));
  });

  test("Should return 403 if an invalid answer is provided", async () => {
    const { sut } = makeSut();
    const fakeRequest = mockFakeRequest();
    fakeRequest.body.answer = "wrong_answer";
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(forbidden(new InvalidParamError("answer")));
  });

  test("Should return 500 if LoadSurveyById throws", async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, "loadById")
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should calls SaveSurveyResult with correct values", async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultStub, "save");
    const httpRequest = mockFakeRequest();
    await sut.handle(httpRequest);
    expect(saveSpy).toHaveBeenCalledWith(mockSaveSurveyResultParams());
  });

  test("Should return 500 if SaveSurveyResult throws", async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    jest.spyOn(saveSurveyResultStub, "save").mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 200 on SaveSurveyResult success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()));
  });
});

import MockDate from "mockdate";
import { LoadSurveyResult } from "../../../src/domain/usecases/load-survey-result";
import { LoadSurveyById } from "../../../src/domain/usecases/load-surveys-by-id";
import { LoadSurveyResultController } from "../../../src/presentation/controllers/load-survey-result-controller";
import { InvalidParamError } from "../../../src/presentation/errors/invalid-param-error";
import {
  forbidden,
  ok,
  serverError,
} from "../../../src/presentation/helpers/http/http-helpers";
import { HttpRequest } from "../../../src/presentation/protocols/http";
import { mockSurveyResultModel, throwError } from "../../domain/mocks";
import { mockLoadSurveyById, mockLoadSurveyResult } from "../mocks";

const mockFakeRequest = (): HttpRequest => ({
  accountId: "any_account_id",
  params: { surveyId: "any_survey_id" },
});

interface SutTypes {
  sut: LoadSurveyResultController;
  loadSurveyResultStub: LoadSurveyResult;
  loadSurveyByIdStub: LoadSurveyById;
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(
    loadSurveyByIdStub,
    loadSurveyResultStub
  );
  return {
    sut,
    loadSurveyByIdStub,
    loadSurveyResultStub,
  };
};

describe("LoadSurveyResult Controller", () => {
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

  test("Should return 500 if LoadSurveyById throws", async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, "loadById")
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should calls LoadSurveyResult with correct values", async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, "load");
    const httpRequest = mockFakeRequest();
    await sut.handle(httpRequest);
    expect(loadSpy).toHaveBeenCalledWith("any_survey_id", "any_account_id");
  });

  test("Should return 500 if LoadSurveyResult throws", async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, "load").mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 200 on LoadSurveyResult success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()));
  });
});

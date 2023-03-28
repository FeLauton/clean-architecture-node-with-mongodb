import MockDate from "mockdate";
import { LoadSurveys } from "src/domain/usecases/load-surveys";
import { LoadSurveysController } from "src/presentation/controllers/load-surveys-controller";
import {
  noContent,
  ok,
  serverError,
} from "src/presentation/helpers/http/http-helpers";
import { HttpRequest } from "src/presentation/protocols/http";
import { mockSurveyModels, throwError } from "tests/domain/mocks";
import { mockLoadSurveys } from "tests/presentation/mocks";

const mockRequest = (): HttpRequest => ({
  accountId: "any_id",
});

interface SutTypes {
  sut: LoadSurveysController;
  loadSurveyStub: LoadSurveys;
}

const makeSut = (): SutTypes => {
  const loadSurveyStub = mockLoadSurveys();
  const sut = new LoadSurveysController(loadSurveyStub);
  return {
    sut,
    loadSurveyStub,
  };
};

describe("LoadSurvey Controller", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  test("Should calls LoadSurveys", async () => {
    const { sut, loadSurveyStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyStub, "load");
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.accountId);
  });

  test("Should return 200 on success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(mockSurveyModels()));
  });

  test("Should return 204 if LoadSurveys returns empty", async () => {
    const { sut, loadSurveyStub } = makeSut();
    jest.spyOn(loadSurveyStub, "load").mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });

  test("Should return 500 if LoadSurveys throws", async () => {
    const { sut, loadSurveyStub } = makeSut();
    jest.spyOn(loadSurveyStub, "load").mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});

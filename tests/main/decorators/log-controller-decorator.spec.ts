import { LogErrorRepository } from "data/protocols/db/log/log-error-repository";
import { LogControllerDecorator } from "main/decorators/log-controller-decorator";
import { ok, serverError } from "presentation/helpers/http/http-helpers";
import { Controller } from "presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "presentation/protocols/http";
import { mockLogErrorRepository } from "tests/data/mocks/mock-db-log";
import { mockAccountModel } from "tests/domain/mocks/mock-account";

const mockFakeServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = "any_stack";
  return serverError(fakeError);
};

const mockFakeRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any_email@mail.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(): Promise<HttpResponse> {
      return Promise.resolve(ok(mockAccountModel()));
    }
  }
  return new ControllerStub();
};

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeSut = (): SutTypes => {
  const logErrorRepositoryStub = mockLogErrorRepository();
  const controllerStub = mockController();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  );
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

describe("logControllerDecorator", () => {
  test("Should call controller handle", async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, "handle");
    await sut.handle(mockFakeRequest());
    expect(handleSpy).toHaveBeenCalledWith(mockFakeRequest());
  });

  test("Should return the same result of controller", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(ok(mockAccountModel()));
  });

  test("Should call LogErrorRepository with correct error if controller returns a server error", async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const logSpy = jest.spyOn(logErrorRepositoryStub, "logError");
    jest
      .spyOn(controllerStub, "handle")
      .mockReturnValue(Promise.resolve(mockFakeServerError()));
    await sut.handle(mockFakeRequest());
    expect(logSpy).toHaveBeenCalledWith("any_stack");
  });
});

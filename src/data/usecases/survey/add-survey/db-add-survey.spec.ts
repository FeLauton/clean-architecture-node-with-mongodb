import MockDate from "mockdate";
import { mockAddSurveyParams, throwError } from "../../../../domain/tests";
import { mockAddSurveyRepository } from "./../../../tests";
import { DbAddSurvey } from "./db-add-survey";
import { AddSurveyRepository } from "./db-add-survey-protocols";

interface SutTypes {
  sut: DbAddSurvey;
  addAccountRepositoryStub: AddSurveyRepository;
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = mockAddSurveyRepository();
  const sut = new DbAddSurvey(addAccountRepositoryStub);
  return {
    sut,
    addAccountRepositoryStub,
  };
};

describe("DbAddSurvey Usecase", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  test("Should call AddSurveyRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
    const surveyData = mockAddSurveyParams();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test("Should throw if AddSurveyRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, "add")
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockAddSurveyParams());
    expect(promise).rejects.toThrow();
  });
});

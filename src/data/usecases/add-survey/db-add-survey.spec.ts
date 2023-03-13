import { AddSurveyModel, AddSurveyRepository } from "./db-add-survey-protocols";
import { DbAddSurvey } from "./db-add-survey";
import MockDate from "mockdate";

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: "any_question",
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
  ],
  date: new Date(),
});

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(data: AddSurveyModel): Promise<void> {
      return new Promise((resolve) => resolve(null));
    }
  }
  return new AddSurveyRepositoryStub();
};

interface SutTypes {
  sut: DbAddSurvey;
  addAccountRepositoryStub: AddSurveyRepository;
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddSurveyRepository();
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
    const surveyData = makeFakeSurveyData();
    await sut.add(makeFakeSurveyData());
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test("Should throw if AddSurveyRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, "add")
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.add(makeFakeSurveyData());
    expect(promise).rejects.toThrow();
  });
});

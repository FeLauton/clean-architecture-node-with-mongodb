import { AddSurveyModel, AddSurveyRepository } from "./db-add-survey-protocols";
import { DbAddSurvey } from "./db-add-survey";

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: "any_question",
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
  ],
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
  test("Should call Hasher with correct password", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
    const surveyData = makeFakeSurveyData();
    await sut.add(makeFakeSurveyData());
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });
});

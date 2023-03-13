import { LoadSurveyController } from "./load-surveys-controller";
import { SurveyModel } from "../../../../domain/models/survey";
import MockDate from "mockdate";
import { LoadSurveys } from "./load-surveys-controller-protocols";

const makeFakeSurveys = (): SurveyModel[] => [
  {
    id: "any_id",
    question: "any_question",
    answers: [
      {
        image: "any_image",
        answer: "any_answer",
      },
    ],
    date: new Date(),
  },
  {
    id: "other_id",
    question: "other_question",
    answers: [
      {
        image: "other_image",
        answer: "other_answer",
      },
    ],
    date: new Date(),
  },
];

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise<SurveyModel[]>((resolve) =>
        resolve(makeFakeSurveys())
      );
    }
  }
  return new LoadSurveyStub();
};

interface SutTypes {
  sut: LoadSurveyController;
  loadSurveyStub: LoadSurveys;
}

const makeSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveys();
  const sut = new LoadSurveyController(loadSurveyStub);
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
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });
});

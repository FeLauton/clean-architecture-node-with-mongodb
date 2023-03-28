import { LoadSurveyByIdRepository } from "data/protocols/db/survey/load-survey-by-id-repository";
import { DbLoadSurveyById } from "data/usecases/db-load-survey-by-id";
import MockDate from "mockdate";
import { mockLoadSurveyByIdRepository } from "tests/data/mocks";
import { mockSurveyModel, throwError } from "tests/domain/mocks";

interface SutTypes {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe("DbLoadSurveyById", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  test("Should calls loadSurveyById with correct id", async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, "loadById");
    await sut.loadById("any_id");
    expect(loadByIdSpy).toHaveBeenCalledWith("any_id");
  });

  test("Should throw if loadSurveyById throws", async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositoryStub, "loadById")
      .mockImplementationOnce(throwError);
    const promise = sut.loadById("");
    expect(promise).rejects.toThrow();
  });

  test("Should return survey on success", async () => {
    const { sut } = makeSut();
    const surveys = await sut.loadById("any_id");
    expect(surveys).toEqual(mockSurveyModel());
  });
});

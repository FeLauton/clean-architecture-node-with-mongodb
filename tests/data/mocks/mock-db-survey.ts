import { LoadSurveyByIdRepository } from "data/protocols/db/survey/load-survey-by-id-repository";
import { LoadSurveyRepository } from "data/protocols/db/survey/load-survey-repository";
import { AddSurveyRepository } from "data/usecases/db-add-survey-protocols";
import { SurveyModel } from "domain/models/survey";
import { AddSurveyParams } from "domain/usecases/add-survey";
import { mockSurveyModel, mockSurveyModels } from "tests/domain/mocks";

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(data: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyByIdRepository {
    loadById(): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }
  return new LoadSurveyRepositoryStub();
};

export const mockLoadSurveysRepository = (): LoadSurveyRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyRepository {
    loadAll(accountId: string): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels());
    }
  }
  return new LoadSurveyRepositoryStub();
};

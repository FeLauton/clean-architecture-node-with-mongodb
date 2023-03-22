import { SurveyModel } from "../../domain/models/survey";
import { mockSurveyModel, mockSurveyModels } from "../../domain/tests";
import { LoadSurveyByIdRepository } from "../protocols/db/survey/load-survey-by-id-repository";
import { LoadSurveyRepository } from "../protocols/db/survey/load-survey-repository";
import { AddSurveyRepository } from "../usecases/survey/add-survey/db-add-survey-protocols";
import { AddSurveyParams } from "./../../domain/usecases/survey/add-survey";

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(data: AddSurveyParams): Promise<void> {
      return new Promise((resolve) => resolve(null));
    }
  }
  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyByIdRepository {
    loadById(): Promise<SurveyModel> {
      return new Promise<SurveyModel>((resolve) => resolve(mockSurveyModel()));
    }
  }
  return new LoadSurveyRepositoryStub();
};

export const mockLoadSurveysRepository = (): LoadSurveyRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyRepository {
    loadAll(): Promise<SurveyModel[]> {
      return new Promise<SurveyModel[]>((resolve) =>
        resolve(mockSurveyModels())
      );
    }
  }
  return new LoadSurveyRepositoryStub();
};

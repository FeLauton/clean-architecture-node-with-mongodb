import { SurveyModel } from "domain/models/survey";
import { AddSurvey, AddSurveyParams } from "domain/usecases/add-survey";
import { LoadSurveys } from "domain/usecases/load-surveys";
import { LoadSurveyById } from "presentation/controllers/save-survey-result-controller-protocols";
import { mockSurveyModel, mockSurveyModels } from "tests/domain/mocks";
export const mockAddSurvey = (): AddSurvey => {
  class ValidationStub implements AddSurvey {
    async add(data: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new ValidationStub();
};

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }
  return new LoadSurveyByIdStub();
};

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels());
    }
  }
  return new LoadSurveyStub();
};

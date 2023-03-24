import { SurveyModel } from "../../domain/models/survey";
import { mockSurveyModel, mockSurveyModels } from "../../domain/tests";
import { LoadSurveyById } from "../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols";
import {
  AddSurvey,
  AddSurveyParams,
} from "../controllers/survey/add-survey/add-survey-controller-protocols";
import { LoadSurveys } from "../controllers/survey/load-surveys/load-surveys-controller-protocols";
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

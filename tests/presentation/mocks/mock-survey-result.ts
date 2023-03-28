import { LoadSurveyResult } from "src/domain/usecases/load-survey-result";
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
  SurveyResultModel,
} from "src/presentation/controllers/save-survey-result-controller-protocols";
import { mockSurveyResultModel } from "tests/domain/mocks";

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultStub();
};

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load(id: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new LoadSurveyResultStub();
};

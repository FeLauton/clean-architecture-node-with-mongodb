import { LoadSurveyResult } from "../controllers/survey-result/load-survey-result/load-survey-result-controller-protocols";
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
  SurveyResultModel,
} from "../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols";
import { mockSurveyResultModel } from "./../../domain/tests";

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

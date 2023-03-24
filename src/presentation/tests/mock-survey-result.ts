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

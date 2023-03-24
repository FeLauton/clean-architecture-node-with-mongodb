import { SurveyResultModel } from "../../domain/models/survey-result";
import { mockSurveyResultModel } from "../../domain/tests";
import {
  SaveSurveyResultParams,
  SaveSurveyResultRepository,
} from "../usecases/survey-result/save-survey-result/db-save-survey-result-protocols";

export const mockSaveSurveyResultRepository =
  (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
      async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel());
      }
    }
    return new SaveSurveyResultRepositoryStub();
  };

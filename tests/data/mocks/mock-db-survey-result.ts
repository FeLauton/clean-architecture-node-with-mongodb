import { LoadSurveyResultRepository } from "../../../src/data/protocols/db/survey-result/load-survey-result-repository";
import {
  SaveSurveyResultParams,
  SaveSurveyResultRepository,
} from "../../../src/data/usecases/db-save-survey-result-protocols";
import { SurveyResultModel } from "../../../src/domain/models/survey-result";
import { mockSurveyResultModel } from "./../../domain/mocks";

export const mockSaveSurveyResultRepository =
  (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
      async save(data: SaveSurveyResultParams): Promise<void> {
        return Promise.resolve();
      }
    }
    return new SaveSurveyResultRepositoryStub();
  };

export const mockLoadSurveyResultRepository =
  (): LoadSurveyResultRepository => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId(
        surveyId: string,
        accountId: string
      ): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel());
      }
    }
    return new LoadSurveyResultRepositoryStub();
  };

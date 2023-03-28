import { SurveyResultModel } from "data/usecases/db-load-survey-result-protocols";

export interface LoadSurveyResultRepository {
  loadBySurveyId(
    surveyId: string,
    accountId: string
  ): Promise<SurveyResultModel>;
}

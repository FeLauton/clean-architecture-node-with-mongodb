import { SurveyResultModel } from "../../../usecases/survey-result/load-survey-result/db-load-survey-result-protocols";

export interface LoadSurveyResultRepository {
  loadBySurveyId(
    surveyId: string,
    accountId: string
  ): Promise<SurveyResultModel>;
}

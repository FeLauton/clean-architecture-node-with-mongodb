import {
  SaveSurveyResultModel,
  SurveyResultModel,
} from "../../../usecases/survey-result/save-survey-result/db-save-survey-result-protocols";

export interface SaveSurveyResultRepository {
  save(surveyData: SaveSurveyResultModel): Promise<SurveyResultModel>;
}

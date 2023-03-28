import { SaveSurveyResultParams } from "../../../usecases/db-save-survey-result-protocols";

export interface SaveSurveyResultRepository {
  save(surveyData: SaveSurveyResultParams): Promise<void>;
}

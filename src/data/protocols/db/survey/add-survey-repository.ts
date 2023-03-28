import { AddSurveyParams } from "data/usecases/db-add-survey-protocols";

export interface AddSurveyRepository {
  add(surveyData: AddSurveyParams): Promise<void>;
}

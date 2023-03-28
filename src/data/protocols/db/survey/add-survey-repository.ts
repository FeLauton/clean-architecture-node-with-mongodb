import { AddSurveyParams } from "../../../usecases/db-add-survey-protocols";

export interface AddSurveyRepository {
  add(surveyData: AddSurveyParams): Promise<void>;
}

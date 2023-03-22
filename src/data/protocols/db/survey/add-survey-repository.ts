import { AddSurveyParams } from "../../../usecases/survey/add-survey/db-add-survey-protocols";

export interface AddSurveyRepository {
  add(surveyData: AddSurveyParams): Promise<void>;
}

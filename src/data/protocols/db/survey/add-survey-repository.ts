import { AddSurveyModel } from "../../../usecases/survey/add-survey/db-add-survey-protocols";

export interface AddSurveyRepository {
  add(surveyData: AddSurveyModel): Promise<void>;
}

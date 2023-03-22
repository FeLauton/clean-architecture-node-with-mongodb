import { SurveyResultModel } from "../models/survey-result";
import { SaveSurveyResultParams } from "../usecases/survey-result/save-survey-result";

export const mockSurveyResultModel = (): SurveyResultModel => ({
  id: "any_id",
  surveyId: "any_survey_id",
  accountId: "any_account_id",
  answer: "any_answer",
  date: new Date(),
});

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => {
  const { id, ...rest } = mockSurveyResultModel();
  return rest;
};

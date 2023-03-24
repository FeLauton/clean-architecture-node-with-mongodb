import { SurveyResultModel } from "../models/survey-result";
import { SaveSurveyResultParams } from "../usecases/survey-result/save-survey-result";

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: "any_survey_id",
  question: "any_survey_question",
  answers: [
    {
      answer: "string",
      count: 2,
      percent: 20,
    },
    {
      image: "any_image",
      answer: "string",
      count: 10,
      percent: 80,
    },
  ],
  date: new Date(),
});

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: "any_survey_id",
  accountId: "any_account_id",
  answer: "any_answer",
  date: new Date(),
});

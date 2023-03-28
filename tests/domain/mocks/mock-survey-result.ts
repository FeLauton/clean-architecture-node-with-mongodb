import { SurveyResultModel } from "domain/models/survey-result";
import { SaveSurveyResultParams } from "domain/usecases/save-survey-result";

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: "any_id",
  question: "any_question",
  answers: [
    {
      answer: "any_answer",
      count: 0,
      percent: 0,
    },
    {
      image: "any_image",
      answer: "any_answer",
      count: 0,
      percent: 0,
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

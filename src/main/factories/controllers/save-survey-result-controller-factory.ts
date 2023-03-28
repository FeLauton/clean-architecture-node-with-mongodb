import { SaveSurveyResultController } from "../../../presentation/controllers/save-survey-result-controller";
import { Controller } from "../../../presentation/protocols";
import { makeLogControllerDecorator } from "../decorators/log-controller-decorator-factory";
import { makeDbSaveSurveyResultFactory } from "../usecases/survey-result/save-survey-result/db-save-survey-result-factory";
import { makeDbLoadSurveyByIdFactory } from "../usecases/survey/load-survey-by-id/db-load-surveys-factory";

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveyByIdFactory(),
    makeDbSaveSurveyResultFactory()
  );
  return makeLogControllerDecorator(controller);
};

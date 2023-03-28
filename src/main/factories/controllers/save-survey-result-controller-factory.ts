import { makeLogControllerDecorator } from "main/factories/decorators/log-controller-decorator-factory";
import { makeDbSaveSurveyResultFactory } from "main/factories/usecases/survey-result/save-survey-result/db-save-survey-result-factory";
import { makeDbLoadSurveyByIdFactory } from "main/factories/usecases/survey/load-survey-by-id/db-load-surveys-factory";
import { SaveSurveyResultController } from "presentation/controllers/save-survey-result-controller";
import { Controller } from "presentation/protocols";

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveyByIdFactory(),
    makeDbSaveSurveyResultFactory()
  );
  return makeLogControllerDecorator(controller);
};

import { makeLogControllerDecorator } from "main/factories/decorators/log-controller-decorator-factory";
import { makeDbLoadSurveyResultFactory } from "main/factories/usecases/survey-result/load-survey-result/db-load-survey-result-factory";
import { makeDbLoadSurveyByIdFactory } from "main/factories/usecases/survey/load-survey-by-id/db-load-surveys-factory";
import { LoadSurveyResultController } from "presentation/controllers/load-survey-result-controller";
import { Controller } from "presentation/protocols";

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbLoadSurveyByIdFactory(),
    makeDbLoadSurveyResultFactory()
  );
  return makeLogControllerDecorator(controller);
};

import { LoadSurveyResultController } from "../../../presentation/controllers/load-survey-result-controller";
import { Controller } from "../../../presentation/protocols";
import { makeLogControllerDecorator } from "../decorators/log-controller-decorator-factory";
import { makeDbLoadSurveyResultFactory } from "../usecases/survey-result/load-survey-result/db-load-survey-result-factory";
import { makeDbLoadSurveyByIdFactory } from "../usecases/survey/load-survey-by-id/db-load-surveys-factory";

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbLoadSurveyByIdFactory(),
    makeDbLoadSurveyResultFactory()
  );
  return makeLogControllerDecorator(controller);
};

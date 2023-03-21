import { Controller } from "../../../../../presentation/protocols";
import { makeLogControllerDecorator } from "../../../decorators/log-controller-decorator-factory";
import { SaveSurveyResultController } from "../../../../../presentation/controllers/survey-result/save-survey-result/save-survey-result-controller";
import { makeDbSaveSurveyResultFactory } from "../../../usecases/survey-result/save-survey-result/db-save-survey-result-factory";
import { makeDbLoadSurveyByIdFactory } from "../../../usecases/survey/load-survey-by-id/db-load-surveys-factory";

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveyByIdFactory(),
    makeDbSaveSurveyResultFactory()
  );
  return makeLogControllerDecorator(controller);
};

import { AddSurveyController } from "../../../presentation/controllers/add-survey-controller";
import { Controller } from "../../../presentation/protocols";
import { makeLogControllerDecorator } from "../decorators/log-controller-decorator-factory";
import { makeDbAddSurveyFactory } from "../usecases/survey/add-survey/db-add-survey-factory";
import { makeAddSurveyValidation } from "./add-survey-validation-factory";

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurveyFactory()
  );
  return makeLogControllerDecorator(controller);
};

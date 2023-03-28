import { makeLogControllerDecorator } from "main/factories/decorators/log-controller-decorator-factory";
import { makeDbAddSurveyFactory } from "main/factories/usecases/survey/add-survey/db-add-survey-factory";
import { AddSurveyController } from "presentation/controllers/add-survey-controller";
import { Controller } from "presentation/protocols";
import { makeAddSurveyValidation } from "./add-survey-validation-factory";

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurveyFactory()
  );
  return makeLogControllerDecorator(controller);
};

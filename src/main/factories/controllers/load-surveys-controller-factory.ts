import { makeLogControllerDecorator } from "main/factories/decorators/log-controller-decorator-factory";
import { makeDbLoadSurveysFactory } from "main/factories/usecases/survey/load-surveys/db-load-surveys-factory";
import { LoadSurveysController } from "presentation/controllers/load-surveys-controller";
import { Controller } from "presentation/protocols";

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveysFactory());
  return makeLogControllerDecorator(controller);
};

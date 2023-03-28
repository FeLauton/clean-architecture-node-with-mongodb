import { LoadSurveysController } from "../../../presentation/controllers/load-surveys-controller";
import { Controller } from "../../../presentation/protocols";
import { makeLogControllerDecorator } from "../decorators/log-controller-decorator-factory";
import { makeDbLoadSurveysFactory } from "../usecases/survey/load-surveys/db-load-surveys-factory";

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveysFactory());
  return makeLogControllerDecorator(controller);
};

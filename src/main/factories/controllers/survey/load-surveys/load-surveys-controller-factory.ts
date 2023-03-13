import { makeLogControllerDecorator } from "../../../decorators/log-controller-decorator-factory";
import { Controller } from "../../../../../presentation/protocols";
import { LoadSurveysController } from "../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller";
import { makeDbLoadSurveysFactory } from "../../../usecases/survey/load-surveys/db-load-surveys-factory";

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveysFactory());
  return makeLogControllerDecorator(controller);
};

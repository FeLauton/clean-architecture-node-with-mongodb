import { LogMongoRepository } from "../../../infra/db/mongodb/log-mongo-repository";
import { LogControllerDecorator } from "../../decorators/log-controller-decorator";
import { Controller } from "./../../../presentation/protocols/controller";

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};

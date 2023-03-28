import { DbLoadSurveys } from "../../../../../data/usecases/db-load-surveys";
import { LoadSurveys } from "../../../../../domain/usecases/load-surveys";
import { SurveyMongoRepository } from "../../../../../infra/db/mongodb/survey-mongo-repository";

export const makeDbLoadSurveysFactory = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};

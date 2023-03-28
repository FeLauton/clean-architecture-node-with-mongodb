import { DbLoadSurveyById } from "../../../../../data/usecases/db-load-survey-by-id";
import { LoadSurveyById } from "../../../../../domain/usecases/load-surveys-by-id";
import { SurveyMongoRepository } from "../../../../../infra/db/mongodb/survey-mongo-repository";

export const makeDbLoadSurveyByIdFactory = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyById(surveyMongoRepository);
};

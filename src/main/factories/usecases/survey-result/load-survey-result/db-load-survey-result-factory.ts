import { DbLoadSurveyResult } from "../../../../../data/usecases/db-load-survey-result";
import { LoadSurveyResult } from "../../../../../domain/usecases/load-survey-result";
import { SurveyMongoRepository } from "../../../../../infra/db/mongodb/survey-mongo-repository";
import { SaveSurveyResultMongoRepository } from "../../../../../infra/db/mongodb/survey-result-mongo-repository";

export const makeDbLoadSurveyResultFactory = (): LoadSurveyResult => {
  const saveSurveyResultMongoRepository = new SaveSurveyResultMongoRepository();
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyResult(
    saveSurveyResultMongoRepository,
    surveyMongoRepository
  );
};

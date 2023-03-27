import { DbLoadSurveyResult } from "../../../../../data/usecases/survey-result/load-survey-result/db-load-survey-result";
import { LoadSurveyResult } from "../../../../../domain/usecases/survey-result/load-survey-result";
import { SaveSurveyResultMongoRepository } from "../../../../../infra/db/mongodb/survey-result/survey-result-mongo-repository";
import { SurveyMongoRepository } from "../../../../../infra/db/mongodb/survey/survey-mongo-repository";

export const makeDbLoadSurveyResultFactory = (): LoadSurveyResult => {
  const saveSurveyResultMongoRepository = new SaveSurveyResultMongoRepository();
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyResult(
    saveSurveyResultMongoRepository,
    surveyMongoRepository
  );
};

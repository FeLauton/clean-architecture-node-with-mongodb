import { DbSaveSurveyResult } from "../../../../../data/usecases/db-save-survey-result";
import { SaveSurveyResult } from "../../../../../domain/usecases/save-survey-result";
import { SaveSurveyResultMongoRepository } from "../../../../../infra/db/mongodb/survey-result-mongo-repository";

export const makeDbSaveSurveyResultFactory = (): SaveSurveyResult => {
  const saveSurveyResultMongoRepository = new SaveSurveyResultMongoRepository();
  return new DbSaveSurveyResult(
    saveSurveyResultMongoRepository,
    saveSurveyResultMongoRepository
  );
};

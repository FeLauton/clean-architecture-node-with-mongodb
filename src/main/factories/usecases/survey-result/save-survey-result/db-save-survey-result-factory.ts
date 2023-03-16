import { SaveSurveyResult } from "./../../../../../domain/usecases/survey-result/save-survey-result";
import { DbSaveSurveyResult } from "../../../../../data/usecases/survey-result/save-survey-result/db-save-survey-result";
import { SaveSurveyResultMongoRepository } from "../../../../../infra/db/mongodb/survey-result/survey-result-mongo-repository";

export const makeDbSaveSurveyResultFactory = (): SaveSurveyResult => {
  const saveSurveyResultMongoRepository = new SaveSurveyResultMongoRepository();
  return new DbSaveSurveyResult(saveSurveyResultMongoRepository);
};

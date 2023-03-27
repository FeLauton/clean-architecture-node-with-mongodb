import {
  LoadSurveyByIdRepository,
  LoadSurveyResult,
  LoadSurveyResultRepository,
  SurveyResultModel,
} from "./db-load-survey-result-protocols";

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
      accountId
    );
    if (!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId);
    }
    return surveyResult;
  }
}

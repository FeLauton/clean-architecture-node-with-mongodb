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
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
      accountId
    );
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId);
      surveyResult = {
        answers: survey.answers.map((answer) =>
          Object.assign({}, answer, { count: 0, percent: 0 })
        ),
        date: survey.date,
        question: survey.question,
        surveyId: survey.id,
      };
    }
    return surveyResult;
  }
}

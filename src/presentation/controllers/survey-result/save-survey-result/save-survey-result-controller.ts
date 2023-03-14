import {
  HttpRequest,
  HttpResponse,
  SaveSurveyResult,
  LoadSurveyById,
  Controller,
} from "./save-survey-result-controller-protocols";

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.loadSurveyById.loadById(httpRequest.params.surveyId);
    this.saveSurveyResult.save(httpRequest.body);
    return;
  }
}

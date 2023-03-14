import {
  HttpRequest,
  HttpResponse,
  SaveSurveyResult,
} from "./save-survey-result-controller-protocols";
import { Controller } from "./save-survey-result-controller-protocols";

export class SaveSurveyResultController implements Controller {
  constructor(private readonly saveSurveyResult: SaveSurveyResult) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.saveSurveyResult.save(httpRequest.body);
    return;
  }
}

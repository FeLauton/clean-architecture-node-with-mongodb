import {
  ok,
  badRequest,
  serverError,
} from "./../../../helpers/http/http-helpers";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveys,
} from "./load-surveys-controller-protocols";

export class LoadSurveyController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load();
      return ok(surveys);
    } catch (error) {
      return serverError(error);
    }
  }
}

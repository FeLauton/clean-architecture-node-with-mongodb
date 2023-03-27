import { ok, serverError } from "../../../helpers/http/http-helpers";
import { InvalidParamError } from "./../../../errors/invalid-param-error";
import { forbidden } from "./../../../helpers/http/http-helpers";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  LoadSurveyResult,
} from "./load-survey-result-controller-protocols";

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const { accountId } = httpRequest;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return forbidden(new InvalidParamError("surveyId"));
      }
      const surveyResult = await this.loadSurveyResult.load(
        surveyId,
        accountId
      );
      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}

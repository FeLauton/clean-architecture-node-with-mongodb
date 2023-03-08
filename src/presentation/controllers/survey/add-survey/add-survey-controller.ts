import { badRequest, serverError } from "../../../helpers/http/http-helpers";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from "../../../protocols";

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}

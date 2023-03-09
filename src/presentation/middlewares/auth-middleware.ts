import { AccessDeniedError } from "./../errors/access-denied-error";
import { forbidden } from "./../helpers/http/http-helpers";
import { HttpRequest, HttpResponse, Middleware } from "./../protocols";
export class AuthMiddleware implements Middleware {
  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise<HttpResponse>((resolve) =>
      resolve(forbidden(new AccessDeniedError()))
    );
  }
}

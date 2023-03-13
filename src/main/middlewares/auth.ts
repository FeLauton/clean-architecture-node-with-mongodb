import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware-factory";
import { adaptMiddleware } from "../adapters/express-middleware-adapter";

export const auth = adaptMiddleware(makeAuthMiddleware());

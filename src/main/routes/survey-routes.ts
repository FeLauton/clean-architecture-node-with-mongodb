import { adaptMiddleware } from "./../adapters/express-middleware-adapter";
import { makeAuthMiddleware } from "./../factories/middlewares/auth-middleware-factory";
import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeSurveyController } from "../factories/controllers/survey/add-survey/add-survey-controler-factory";

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware("admin"));
  router.post("/surveys", adminAuth, adaptRoute(makeSurveyController()));
};

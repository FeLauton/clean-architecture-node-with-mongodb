import { adaptMiddleware } from "./../adapters/express-middleware-adapter";
import { makeAuthMiddleware } from "./../factories/middlewares/auth-middleware-factory";
import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeLoadSurveysController } from "../factories/controllers/survey/load-surveys/load-surveys-controller-factory";
import { makeAddSurveyController } from "../factories/controllers/survey/add-survey/add-survey-controler-factory";

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware("admin"));
  const userAuth = adaptMiddleware(makeAuthMiddleware("user"));
  router.post("/surveys", adminAuth, adaptRoute(makeAddSurveyController()));
  router.get("/surveys", userAuth, adaptRoute(makeLoadSurveysController()));
};

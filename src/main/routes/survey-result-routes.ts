import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeLoadSurveyResultController } from "../factories/controllers/load-survey-result-controller-factory";
import { makeSaveSurveyResultController } from "../factories/controllers/save-survey-result-controller-factory";
import { auth } from "../middlewares/auth";

export default (router: Router): void => {
  router.put(
    "/surveys/:surveyId/results",
    auth,
    adaptRoute(makeSaveSurveyResultController())
  );
  router.get(
    "/surveys/:surveyId/results",
    auth,
    adaptRoute(makeLoadSurveyResultController())
  );
};

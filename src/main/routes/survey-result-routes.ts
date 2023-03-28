import { Router } from "express";
import { adaptRoute } from "main/adapters/express-route-adapter";
import { makeLoadSurveyResultController } from "main/factories/controllers/load-survey-result-controller-factory";
import { makeSaveSurveyResultController } from "main/factories/controllers/save-survey-result-controller-factory";
import { auth } from "main/middlewares/auth";

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

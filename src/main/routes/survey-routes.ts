import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeSurveyController } from "../factories/controllers/add-survey/add-survey-controler-factory";

export default (router: Router): void => {
  router.post("/survey", adaptRoute(makeSurveyController()));
};

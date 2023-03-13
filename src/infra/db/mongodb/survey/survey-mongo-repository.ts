import { LoadSurveyRepository } from "./../../../../data/protocols/db/survey/load-survey-repository";
import { AddSurveyRepository } from "../../../../data/protocols/db/survey/add-survey-repository";
import { AddSurveyModel } from "../../../../domain/usecases/add-survey";
import { MongoHelper } from "../helpers/mongo-helpers";
import { SurveyModel } from "../../../../domain/models/survey";

export class SurveyMongoRepository
  implements AddSurveyRepository, LoadSurveyRepository
{
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    const surveys = await surveyCollection.find().toArray();
    return surveys.map((survey) => MongoHelper.mongoIdMap(survey));
  }
}

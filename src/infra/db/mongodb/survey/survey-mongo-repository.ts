import { LoadSurveyByIdRepository } from "./../../../../data/protocols/db/survey/load-survey-by-id-repository";
import { LoadSurveyRepository } from "./../../../../data/protocols/db/survey/load-survey-repository";
import { AddSurveyRepository } from "../../../../data/protocols/db/survey/add-survey-repository";
import { AddSurveyModel } from "../../../../domain/usecases/add-survey";
import { MongoHelper } from "../helpers/mongo-helpers";
import { SurveyModel } from "../../../../domain/models/survey";
import { ObjectId } from "mongodb";

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveyRepository,
    LoadSurveyByIdRepository
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

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return MongoHelper.mongoIdMap(survey);
  }
}

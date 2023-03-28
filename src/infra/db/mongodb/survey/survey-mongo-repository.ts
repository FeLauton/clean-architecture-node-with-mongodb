import { ObjectId } from "mongodb";
import { AddSurveyRepository } from "../../../../data/protocols/db/survey/add-survey-repository";
import { SurveyModel } from "../../../../domain/models/survey";
import { AddSurveyParams } from "../../../../domain/usecases/survey/add-survey";
import { LoadSurveyByIdRepository } from "./../../../../data/protocols/db/survey/load-survey-by-id-repository";
import { LoadSurveyRepository } from "./../../../../data/protocols/db/survey/load-survey-repository";
import { MongoHelper } from "./../helpers/mongo-helpers";
import { QueryBuilder } from "./../helpers/query-builder";

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveyRepository,
    LoadSurveyByIdRepository
{
  async add(surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(accountId: string): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    const query = new QueryBuilder()
      .lookup({
        from: "surveyResults",
        foreignField: "surveyId",
        localField: "_id",
        as: "result",
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: "$result",
                  as: "item",
                  cond: {
                    $eq: ["$$item.accountId", new ObjectId(accountId)],
                  },
                },
              },
            },
            1,
          ],
        },
      })
      .build();
    const surveys = await surveyCollection.aggregate(query).toArray();
    return surveys && MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return survey && MongoHelper.map(survey);
  }
}

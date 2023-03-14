import { SurveyResultModel } from "../../../../domain/models/survey-result";
import { SaveSurveyResultModel } from "../../../../domain/usecases/save-survey-result";
import { MongoHelper } from "../helpers/mongo-helpers";
import { SaveSurveyResultRepository } from "./../../../../data/protocols/db/survey/save-survey-result-repository";

export class SaveSurveyResultMongoRepository
  implements SaveSurveyResultRepository
{
  async save(surveyData: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = MongoHelper.getCollection("surveyResults");
    const surveyResult = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: surveyData.surveyId,
        accountId: surveyData.accountId,
      },
      {
        $set: {
          answer: surveyData.answer,
          date: surveyData.date,
        },
      },
      { upsert: true, returnDocument: "after" }
    );
    return surveyResult && MongoHelper.mongoIdMap(surveyResult.value);
  }
}

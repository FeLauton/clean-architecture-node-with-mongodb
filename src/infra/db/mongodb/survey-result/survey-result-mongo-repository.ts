import { SurveyResultModel } from "../../../../domain/models/survey-result";
import { SaveSurveyResultModel } from "../../../../domain/usecases/survey-result/save-survey-result";
import { MongoHelper } from "../helpers/mongo-helpers";
import { SaveSurveyResultRepository } from "../../../../data/protocols/db/survey-result/save-survey-result-repository";

export class SaveSurveyResultMongoRepository
  implements SaveSurveyResultRepository
{
  async save(surveyData: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const { accountId, answer, date, surveyId } = surveyData;
    const surveyResultCollection = MongoHelper.getCollection("surveyResults");
    const surveyResult = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId,
        accountId,
      },
      {
        $set: {
          answer,
          date,
        },
      },
      { upsert: true, returnDocument: "after" }
    );
    return surveyResult && MongoHelper.mongoIdMap(surveyResult.value);
  }
}

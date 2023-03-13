import { LoadSurveyRepository } from "../../protocols/db/survey/load-survey-repository";
import { LoadSurveys } from "../../../domain/usecases/load-surveys";
import { SurveyModel } from "../../../domain/models/survey";

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveyRepository: LoadSurveyRepository) {}

  async load(): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveyRepository.loadAll();
    return surveys;
  }
}

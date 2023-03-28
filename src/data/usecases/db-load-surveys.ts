import { LoadSurveyRepository } from "data/protocols/db/survey/load-survey-repository";
import { SurveyModel } from "domain/models/survey";
import { LoadSurveys } from "domain/usecases/load-surveys";

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveyRepository: LoadSurveyRepository) {}

  async load(accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveyRepository.loadAll(accountId);
    return surveys;
  }
}

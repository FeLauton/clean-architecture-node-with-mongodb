import { Validation } from "../../../../../presentation/protocols/validations";
import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";
import { makeSaveSurveyResultValidation } from "./save-survey-result-validation-factory";

jest.mock("../../../../../validation/validators/validation-composite");

describe("makeSaveSurveyResultValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeSaveSurveyResultValidation();
    const validations: Validation[] = [];
    for (const field of ["answer"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});

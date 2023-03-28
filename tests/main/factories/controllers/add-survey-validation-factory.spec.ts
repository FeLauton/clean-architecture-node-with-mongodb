import { Validation } from "../../../../src/presentation/protocols/validations";
import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../src/validation/validators";
import { makeAddSurveyValidation } from "./../../../../src/main/factories/controllers/add-survey-validation-factory";

jest.mock("../../../../src/validation/validators/validation-composite");

describe("SignupValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [];
    for (const field of ["question", "answers"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});

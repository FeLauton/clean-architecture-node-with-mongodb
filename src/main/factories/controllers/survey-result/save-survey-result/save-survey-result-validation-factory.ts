import {
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../../validation/validators";
import { Validation } from "../../../../../presentation/protocols/validations";

export const makeSaveSurveyResultValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["answer"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};

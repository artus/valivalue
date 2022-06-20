import { ObjectValidator } from "./ObjectValidator";

type StringType = string | undefined;

export class StringValidator {

  constructor(
    private readonly objectValidator: ObjectValidator
  ) {
    // Do nothing
  }

  validateMinLength(value: StringType, min: number, subject = 'String'): string {
    const validatedString = this.objectValidator.validateNotNull(value, subject);

    if (validatedString.length < min) {
      throw new Error(`${subject} must at least be ${min} character(s) long.`);
    }

    return validatedString;
  }

  validateMaxLength(value: StringType, max: number, subject = 'String'): string {
    const validatedString = this.objectValidator.validateNotNull(value, subject);

    if (validatedString.length > max) {
      throw new Error(`${subject} can not have more than ${max} character(s).`);
    }

    return validatedString;
  }

  validateMinAndMaxLength(value: StringType, min: number, max: number, subject = 'String'): string {
    const validatedString = this.objectValidator.validateNotNull(value, subject);

    if (validatedString.length < min || validatedString.length > max) {
      throw new Error(`${subject} must be between ${min} and ${max} characters long.`);
    }

    return validatedString;
  }

  validateDoesNotContain(value: StringType, forbiddenValues: string[], subject = 'String'): string {
    const validatedString = this.objectValidator.validateNotNull(value, subject);

    for (const forbiddenValue of forbiddenValues) {
      if (validatedString.indexOf(forbiddenValue) >= 0) {
        throw new Error(`${subject} can not contain '${forbiddenValue}'.`)
      }
    }

    return validatedString;
  }

  validateDoesNotContainCaseInsensitive(value: StringType, forbiddenValues: string[], subject = 'String'): string {
    const lowerCaseForbiddenValues = forbiddenValues.map(forbiddenValue => forbiddenValue.toLowerCase());
    const validatedString = this.objectValidator.validateNotNull(value, subject);

    return this.validateDoesNotContain(validatedString.toLowerCase(), lowerCaseForbiddenValues, subject);
  }

  validateResemblesEmail(value: StringType, subject: string): string {
    const validatedString = this.objectValidator.validateNotNull(value, subject);

    if (validatedString.indexOf('@') < 1 || validatedString.indexOf('@') > validatedString.length - 1) {
      throw new Error(`${subject} must be an email address.`);
    }

    return validatedString;
  }
}
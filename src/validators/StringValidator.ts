import { errorMessageFactories } from "../error-messages/ErrorMessageFactory";
import { AbstractValidator } from "./AbstractValidator";

const {
  strings: stringFactories
} = errorMessageFactories;

const DEFAULT_SUBJECT = 'String';

export class StringValidator<OutputType> extends AbstractValidator<string, OutputType> {

  validateMinLength(
    value: string,
    min: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = stringFactories.validateMinLength
  ): OutputType {
    return this.handle(value, value.length < min, () => errorMessageFactory(subject, value, min));
  }

  validateMaxLength(
    value: string,
    max: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = stringFactories.validateMaxLength
  ): OutputType {
    return this.handle(value, value.length > max, () => errorMessageFactory(subject, value, max));
  }

  validateMinAndMaxLength(
    value: string,
    min: number,
    max: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = stringFactories.validateMinAndMaxLength
  ): OutputType {
    return this.handle(value, value.length < min || value.length > max, () => errorMessageFactory(subject, value, min, max));
  }

  validateDoesNotContain(
    value: string,
    forbidden: string | string[],
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = stringFactories.validateDoesNotContain
  ): OutputType {
    if (Array.isArray(forbidden)) {
      for (const forbiddenValue of forbidden) {
        if (value.indexOf(forbiddenValue) >= 0) {
          return this.failure(value, errorMessageFactory(subject, value, forbiddenValue));
        }
      }
      return this.success(value);
    } else {
      return this.handle(value, value.indexOf(forbidden) >= 0, () => errorMessageFactory(subject, value, forbidden));
    }
  }

  validateDoesNotContainCaseInsensitive(
    value: string,
    forbidden: string | string[],
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = stringFactories.validateDoesNotContain
  ): OutputType {
    if (Array.isArray(forbidden)) {
      const lowerCaseForbiddenValues = forbidden.map(forbidden => forbidden.toLowerCase());
      return this.validateDoesNotContain(value.toLowerCase(), lowerCaseForbiddenValues, subject, errorMessageFactory);
    } else {
      return this.validateDoesNotContain(value.toLowerCase(), forbidden, subject, errorMessageFactory);
    }
  }

  validateResemblesEmail(
    value: string,
    subject: string,
    errorMessageFactory = stringFactories.validateResemblesEmail
  ): OutputType {
    return this.handle(
      value,
      value.indexOf('@') < 1 || value.indexOf('@') > value.length - 1,
      () => errorMessageFactory(subject, value)
    );
  }
}
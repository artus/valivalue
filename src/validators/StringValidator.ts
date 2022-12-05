import { errorMessageFactories } from "../error-messages/ErrorMessageFactory";
import { AbstractValidator } from "./AbstractValidator";

const {
  strings: stringFactories
} = errorMessageFactories;

const DEFAULT_SUBJECT = 'String';

/**
 * The StringValidator is a validator that contains methods to validate values of type string.
 * 
 * @class StringValidator<OutputType>
 */
export class StringValidator<OutputType> extends AbstractValidator<string, OutputType> {

  /**
   * Validate whether the value is not empty. Supplied values will be trimmed before validation.
   * 
   * @param {string} value - The value to be validated.
   * @param {string} [subject=String] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateNotEmpty(
    value: string,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = stringFactories.validateNotEmpty
  ): OutputType {
    return this.handle(value, value.trim().length === 0, () => errorMessageFactory(subject, value));
  }

  /**
   * Validate whether the string length is equal or larger than the supplied minimum value.
   * 
   * @param {string} value - The value to be validated.
   * @param {number} min - The minimum length.
   * @param {string} [subject=String] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateMinLength(
    value: string,
    min: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = stringFactories.validateMinLength
  ): OutputType {
    return this.handle(value, value.length < min, () => errorMessageFactory(subject, value, min));
  }

  /**
   * Validate whether the string length is equal or smaller than the supplied maximum value.
   * 
   * @param {string} value - The value to be validated.
   * @param {number} max - The maximum length.
   * @param {string} [subject=String] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateMaxLength(
    value: string,
    max: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = stringFactories.validateMaxLength
  ): OutputType {
    return this.handle(value, value.length > max, () => errorMessageFactory(subject, value, max));
  }

  /**
   * Validate whether the string length is equal or larger than the provided minimum value,
   * or equal or smaller than the supplied maximum value.
   * 
   * @param {string} value - The value to be validated.
   * @param {number} min - The minimum length.
   * @param {number} max - The maximum length.
   * @param {string} [subject=String] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateMinAndMaxLength(
    value: string,
    min: number,
    max: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = stringFactories.validateMinAndMaxLength
  ): OutputType {
    return this.handle(value, value.length < min || value.length > max, () => errorMessageFactory(subject, value, min, max));
  }

  /**
   * Validate whether the string does not contain the supplied forbidden value. This validation is case-sensitive.
   * 
   * @param {string} value - The value to be validated.
   * @param {(string|string[])} forbidden - The forbidden value, or a list of forbidden values.
   * @param {string} [subject=String] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
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

  /**
   * Validate whether the string does not contain the supplied forbidden value. This validation is case-insensitive.
   * 
   * @param {string} value - The value to be validated.
   * @param {(string|string[])} forbidden - The forbidden value, or a list of forbidden values.
   * @param {string} [subject=String] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
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
      return this.validateDoesNotContain(value.toLowerCase(), forbidden.toLowerCase(), subject, errorMessageFactory);
    }
  }

  /**
   * Validate whether the string resembles an email. Email validation is hard, which is why you should not depend on complicated
   * regex rules or other matching algorithms. The only way to be certain that an email is valid is by sending a confirmation email.
   * 
   * This method will validate whether the supplied string resembles an email by checking whether there is an '@' symbol embedded in the correct location.
   * 
   * @param {string} value - The value to be validated.
   * @param {string} [subject=String] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateResemblesEmail(
    value: string,
    subject: string = DEFAULT_SUBJECT,
    errorMessageFactory = stringFactories.validateResemblesEmail
  ): OutputType {
    return this.handle(
      value,
      value.indexOf('@') < 1 || value.indexOf('@') >= value.length - 1,
      () => errorMessageFactory(subject, value)
    );
  }
}
import { errorMessageFactories } from "../error-messages/ErrorMessageFactory";
import { AbstractValidator } from "./AbstractValidator";

const { numbers: numberFactories } = errorMessageFactories;

const DEFAULT_SUBJECT = 'Number';

/**
 * The NumberValidator is a validator that contains methods to validate values of type number.
 * 
 * @class NumberValidator<OutputType>
 */
export class NumberValidator<OutputType> extends AbstractValidator<number, OutputType> {

  /**
   * Validate whether the provided value is equal or larger than the provided minimum value.
   * 
   * @param {number} value - The value to be validated.
   * @param {number} min - The lower bound (inclusive).
   * @param {string} [subject=Number] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateMinValue(
    value: number,
    min: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateMinValue
  ): OutputType {
    return this.handle(value, value < min, () => errorMessageFactory(subject, value, min));
  }

  /**
   * Validate whether the provided value is equal or smaller than the provided maximum value.
   * 
   * @param {number} value - The value to be validated.
   * @param {number} max - The upper bound (inclusive).
   * @param {string} [subject=Number] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateMaxValue(
    value: number,
    max: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateMaxValue
  ): OutputType {
    return this.handle(value, value > max, () => errorMessageFactory(subject, value, max));
  }

  /**
   * Validate whether the provided value is equal or larger than the provided minimum value, and equal or smaller than the provided maximum value.
   * @param {number} value - The value to be validated.
   * @param {number} min - The lower bound (inclusive).
   * @param {number} max - The upper bound (inclusive).
   * @param {string} [subject=Number] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateMinAndMaxValue(
    value: number,
    min: number,
    max: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateMinAndMaxValue
  ): OutputType {
    return this.handle(value, value < min || value > max, () => errorMessageFactory(subject, value, min, max));
  }

  /**
   * Validate whether the provided value is a positive number.
   * 
   * @param {number} value - The value to be validated.
   * @param {string} [subject=Number] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateIsPositive(
    value: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsPositive
  ): OutputType {
    return this.handle(value, value < 0, () => errorMessageFactory(subject, value));
  }

  /**
   * Validate whether the provided value is a negative number.
   * 
   * @param {number} value - The value to be validated.
   * @param {string} [subject=Number] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateIsNegative(
    value: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsNegative
  ): OutputType {
    return this.handle(value, value >= 0, () => errorMessageFactory(subject, value));
  }

  /**
   * Validate whether the provided value is divisible by the second provided value.
   * 
   * @param {number} value - The value to be validated.
   * @param {number} divisibleBy - The number that the validated value should be divisible by.
   * @param {string} [subject=Number] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.

   */
  validateIsDivisibleBy(
    value: number,
    divisibleBy: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsDivisibleBy
  ): OutputType {
    return this.handle(value, value % divisibleBy !== 0, () => errorMessageFactory(subject, value, divisibleBy));
  }

  /**
   * Validate whether the provided value is a factor of the second provided value.
   * 
   * @param {number} value - The value to be validated.
   * @param {number} factorOf - The factor.
   * @param {string} [subject=Number] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateIsFactorOf(
    value: number,
    factorOf: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsFactorOf
  ): OutputType {
    return this.handle(value, factorOf % value !== 0, () => errorMessageFactory(subject, value, factorOf));
  }

  /**
   * Validate whether the provided value is even.
   * 
   * @param {number} value - The value to be validated.
   * @param {string} [subject=Number] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateIsEven(
    value: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsEven
  ): OutputType {
    return this.handle(value, value % 2 !== 0, () => errorMessageFactory(subject, value));
  }

  /**
   * Validate whether the provided value is odd.
   * 
   * @param {number} value - The value to be validated.
   * @param {string} [subject=Number] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateIsOdd(
    value: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsOdd
  ): OutputType {
    return this.handle(value, value % 2 === 0, () => errorMessageFactory(subject, value));
  }
}
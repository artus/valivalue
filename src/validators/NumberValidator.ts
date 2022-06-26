import { errorMessageFactories } from "../error-messages/ErrorMessageFactory";
import { AbstractValidator } from "./AbstractValidator";

const { numbers: numberFactories } = errorMessageFactories;

const DEFAULT_SUBJECT = 'Number';

export class NumberValidator<OutputType> extends AbstractValidator<number, OutputType> {

  validateMinValue(
    value: number,
    min: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateMinValue
  ): OutputType {
    return this.handle(value, value < min, () => errorMessageFactory(subject, value, min));
  }

  validateMaxValue(
    value: number,
    max: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateMaxValue
  ): OutputType {
    return this.handle(value, value > max, () => errorMessageFactory(subject, value, max));
  }

  validateMinAndMaxValue(
    value: number,
    min: number,
    max: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateMinAndMaxValue
  ): OutputType {
    return this.handle(value, value < min || value > max, () => errorMessageFactory(subject, value, min, max));
  }

  validateIsPositive(
    value: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsPositive
  ): OutputType {
    return this.handle(value, value < 0, () => errorMessageFactory(subject, value));
  }

  validateIsNegative(
    value: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsNegative
  ): OutputType {
    return this.handle(value, value >= 0, () => errorMessageFactory(subject, value));
  }

  validateIsDivisibleBy(
    value: number,
    divisibleBy: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsDivisibleBy
  ): OutputType {
    return this.handle(value, value % divisibleBy !== 0, () => errorMessageFactory(subject, value, divisibleBy));
  }

  validateIsFactorOf(
    value: number,
    factorOf: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsFactorOf
  ): OutputType {
    return this.handle(value, factorOf % value !== 0, () => errorMessageFactory(subject, value, factorOf));
  }

  validateIsEven(
    value: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsEven
  ): OutputType {
    return this.handle(value, value % 2 !== 0, () => errorMessageFactory(subject, value));
  }

  validateIsOdd(
    value: number,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = numberFactories.validateIsOdd
  ): OutputType {
    return this.handle(value, value % 2 === 0, () => errorMessageFactory(subject, value));
  }
}
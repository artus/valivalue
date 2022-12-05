import { DateTime } from "luxon";
import { AbstractValidator } from "./AbstractValidator";
import { errorMessageFactories } from "../error-messages/ErrorMessageFactory";

const {
  timestamps: timestampFactories
} = errorMessageFactories

const DEFAULT_SUBJECT = 'Timestamp';

/**
 * The TimestampValidator is a validator that contains methods to validate values of type luxon DateTime.
 * 
 * @class TimestampValidator<OutputType>
 */
export class TimestampValidator<OutputType> extends AbstractValidator<DateTime, OutputType> {

  /**
   * Validate whether the supplied timestamp is after the supplied minimum timestamp.
   * 
   * @param {DateTime} value - The value to be validated.
   * @param {DateTime} isAfter - The lower bound.
   * @param {string} [subject=Timestamp] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateIsAfter(
    value: DateTime,
    isAfter: DateTime,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = timestampFactories.validateIsAfter
  ): OutputType {
    return this.handle(
      value,
      value.toMillis() < isAfter.toMillis(),
      () => errorMessageFactory(subject, value, isAfter)
    );
  }

  /**
   * Validate whether the supplied timestamp is before the supplied maximum timestamp.
   * 
   * @param {DateTime} value - The value to be validated.
   * @param {DateTime} isBefore - The upper bound.
   * @param {string} [subject=Timestamp] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateIsBefore(
    value: DateTime,
    isBefore: DateTime,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = timestampFactories.validateIsBefore
  ): OutputType {
    return this.handle(
      value,
      value.toMillis() > isBefore.toMillis(),
      () => errorMessageFactory(subject, value, isBefore)
    );
  }


  /**
   * Validate whether the supplied timestamp is in the past.
   * 
   * @param {DateTime} value - The value to be validated.
   * @param {string} [subject=Timestamp] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateIsInPast(
    value: DateTime,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = timestampFactories.validateIsInPast
  ): OutputType {
    return this.handle(
      value,
      value.toMillis() > DateTime.now().toMillis(),
      () => errorMessageFactory(subject, value)
    );
  }

  /**
   * Validate whether the supplied timestamp is in the future.
   * 
   * @param {DateTime} value - The value to be validated.
   * @param {string} [subject=Timestamp] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateIsInFuture(
    value: DateTime,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = timestampFactories.validateIsInFuture
  ): OutputType {
    return this.handle(
      value,
      value.toMillis() < DateTime.now().toMillis(),
      () => errorMessageFactory(subject, value)
    );
  }
}
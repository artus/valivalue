import { DateTime } from "luxon";
import { AbstractValidator } from "./AbstractValidator";
import { errorMessageFactories } from "../error-messages/ErrorMessageFactory";

const {
  timestamps: timestampFactories
} = errorMessageFactories

const DEFAULT_SUBJECT = 'Timestamp';

export class TimestampValidator<OutputType> extends AbstractValidator<DateTime, OutputType> {

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
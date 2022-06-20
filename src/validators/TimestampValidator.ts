import { DateTime } from "luxon";
import { ObjectValidator } from "./ObjectValidator";

type DateTimeType = DateTime | undefined;

const DEFAULT_SUBJECT = 'Timestamp';

export class TimestampValidator {

  constructor(
    private readonly objectValidator: ObjectValidator
  ) {
    // Do nothing
  }

  validateIsAfter(timestamp: DateTimeType, isAfter: DateTime, subject = DEFAULT_SUBJECT): DateTime {
    const validatedTimestamp = this.objectValidator.validateNotNull(timestamp, subject);

    if (validatedTimestamp.toMillis() < isAfter.toMillis()) {
      throw new Error(`${subject} must be after ${isAfter.toLocaleString(DateTime.DATETIME_FULL)}`);
    }

    return validatedTimestamp;
  }

  validateIsBefore(timestamp: DateTimeType, isBeore: DateTime, subject = DEFAULT_SUBJECT): DateTime {
    const validatedTimestamp = this.objectValidator.validateNotNull(timestamp, subject);

    if (validatedTimestamp.toMillis() > isBeore.toMillis()) {
      throw new Error(`${subject} must be before ${isBeore.toLocaleString(DateTime.DATETIME_FULL)}`);
    }

    return validatedTimestamp;
  }

  validateIsInPast(timestamp: DateTimeType, subject = DEFAULT_SUBJECT): DateTime {
    const validatedTimestamp = this.objectValidator.validateNotNull(timestamp, subject);

    if (validatedTimestamp.toMillis() > DateTime.now().toMillis()) {
      throw new Error(`${subject} must be in the past.`);
    }

    return validatedTimestamp;
  }

  validateIsInFuture(timestamp: DateTimeType, subject = DEFAULT_SUBJECT): DateTime {
    const validatedTimestamp = this.objectValidator.validateNotNull(timestamp, subject);

    if (validatedTimestamp.toMillis() < DateTime.now().toMillis()) {
      throw new Error(`${subject} must be in the future.`);
    }

    return validatedTimestamp;
  }
}
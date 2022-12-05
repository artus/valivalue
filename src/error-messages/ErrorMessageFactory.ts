import { DateTime } from "luxon";

/**
 * The deafult ErrorMessageFactories.
 */
export const errorMessageFactories = {
  numbers: {
    validateMinValue: (subject: string, value: number, min: number) => `${subject} must not be lower than ${min}.`,
    validateMaxValue: (subject: string, value: number, max: number) => `${subject} must not be higher than ${max}.`,
    validateMinAndMaxValue: (subject: string, value: number, min: number, max: number) => `${subject} must not be lower than ${min} and must not be higher than ${max}.`,
    validateIsPositive: (subject: string, value: number) => `${subject} must be a positive number.`,
    validateIsNegative: (subject: string, value: number) => `${subject} must be a negative number.`,
    validateIsDivisibleBy: (subject: string, value: number, divisibleBy: number) => `${subject} must be divisible by ${divisibleBy}.`,
    validateIsFactorOf: (subject: string, value: number, factorOf: number) => `${subject} must be a factor of ${factorOf}.`,
    validateIsEven: (subject: string, value: number) => `${subject} must be even.`,
    validateIsOdd: (subject: string, value: number) => `${subject} must be odd.`
  },
  strings: {
    validateNotEmpty: (subject: string, value: string) => `${subject} must not be empty.`,
    validateMinLength: (subject: string, value: string, min: number) => `${subject} must at least be ${min} character(s) long.`,
    validateMaxLength: (subject: string, value: string, max: number) => `${subject} can not have more than ${max} character(s).`,
    validateMinAndMaxLength: (subject: string, value: string, min: number, max: number) => `${subject} must be between ${min} and ${max} characters long.`,
    validateDoesNotContain: (subject: string, value: string, forbidden: string) => `${subject} can not contain '${forbidden}'.`,
    validateResemblesEmail: (subject: string, value: string) => `${subject} must be an email address.`
  },
  objects: {
    validateNotNull: <InputType> (subject: string, value: InputType) => `${subject} can not be null.`,
    validateNotUndefined: <InputType> (subject: string, value: InputType) => `${subject} can not be undefined.`,
    validateNotNullOrUndefined: <InputType> (subject: string, value: InputType) => `${subject} can not be null or undefined.`
  },
  timestamps: {
    validateIsAfter: (subject: string, value: DateTime, isAfter: DateTime) => `${subject} must be after ${isAfter.toLocaleString(DateTime.DATETIME_FULL)}.`,
    validateIsBefore: (subject: string, value: DateTime, isBefore: DateTime) => `${subject} must be before ${isBefore.toLocaleString(DateTime.DATETIME_FULL)}.`,
    validateIsInPast: (subject: string, value: DateTime) => `${subject} must be in the past.`,
    validateIsInFuture: (subject: string, value: DateTime) => `${subject} must be in the future.`
  }
}
import { DateTime } from "luxon";
import { defaultErrorFactory } from "../errors/DefaultErrorFactory";
import { throwingValidationResult } from "../validation-result/ThrowingValidationResult";
import { ValidationOptions } from "../ValidationOptions";
import { NumberValidator } from "../validators/NumberValidator";
import { ObjectValidator } from "../validators/ObjectValidator";
import { StringValidator } from "../validators/StringValidator";
import { TimestampValidator } from "../validators/TimestampValidator";

const throwingObjectValidatorOptions = new ValidationOptions<unknown, unknown>(defaultErrorFactory, throwingValidationResult<unknown>());
const throwingNumberValidatorOptions = new ValidationOptions<number, number>(defaultErrorFactory, throwingValidationResult<number>());
const throwingStringValidatorOptions = new ValidationOptions<string, string>(defaultErrorFactory, throwingValidationResult<string>());
const throwingTimestampValidatorOptions = new ValidationOptions<DateTime, DateTime>(defaultErrorFactory, throwingValidationResult<DateTime>());

/**
 * A collection of default throwing validators that will throw an error automatically on validation failure.
 */
export const throwingValidator = {
  objects: new ObjectValidator(throwingObjectValidatorOptions),
  strings: new StringValidator(throwingStringValidatorOptions),
  numbers: new NumberValidator(throwingNumberValidatorOptions),
  timestamps: new TimestampValidator(throwingTimestampValidatorOptions)
};
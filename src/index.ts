import { DateTime } from "luxon";
import { defaultErrorFactory } from "./errors/DefaultErrorFactory";
import { ChainableValidator } from "./validation-result/ChainingValidationReport";
import { throwingValidationResult } from "./validation-result/ThrowingValidationResult";
import { ValidationReport, validationReportFactory } from "./validation-result/ValidationReport";
import { ValidationOptions } from "./ValidationOptions";
import { NumberValidator } from "./validators/NumberValidator";
import { ObjectValidator } from "./validators/ObjectValidator";
import { StringValidator } from "./validators/StringValidator";
import { TimestampValidator } from "./validators/TimestampValidator";

const throwingObjectValidatorOptions = new ValidationOptions<unknown, unknown>(defaultErrorFactory, throwingValidationResult<unknown>());
const throwingNumberValidatorOptions = new ValidationOptions<number, number>(defaultErrorFactory, throwingValidationResult<number>());
const throwingStringValidatorOptions = new ValidationOptions<string, string>(defaultErrorFactory, throwingValidationResult<string>());
const throwingTimestampValidatorOptions = new ValidationOptions<DateTime, DateTime>(defaultErrorFactory, throwingValidationResult<DateTime>());

export const validator = {
  objects: new ObjectValidator(throwingObjectValidatorOptions),
  strings: new StringValidator(throwingStringValidatorOptions),
  numbers: new NumberValidator(throwingNumberValidatorOptions),
  timestamps: new TimestampValidator(throwingTimestampValidatorOptions)
};

const reportingObjectValidatorOptions = new ValidationOptions<unknown, ValidationReport<unknown>>(defaultErrorFactory, validationReportFactory<unknown>());
const reportingNumberValidatorOptions = new ValidationOptions<number, ValidationReport<number>>(defaultErrorFactory, validationReportFactory<number>());
const reportingStringValidatorOptions = new ValidationOptions<string, ValidationReport<string>>(defaultErrorFactory, validationReportFactory<string>());
const reportingTimestampValidatorOptions = new ValidationOptions<DateTime, ValidationReport<DateTime>>(defaultErrorFactory, validationReportFactory<DateTime>());

export const reportingValidator = {
  objects: new ObjectValidator(reportingObjectValidatorOptions),
  strings: new StringValidator(reportingStringValidatorOptions),
  numbers: new NumberValidator(reportingNumberValidatorOptions),
  timestamps: new TimestampValidator(reportingTimestampValidatorOptions)
};

export const chainableValidator = new ChainableValidator();

export const validators = {
  default: validator,
  reporting: reportingValidator,
  chainable: chainableValidator
}
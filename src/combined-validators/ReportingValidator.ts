import { DateTime } from "luxon";
import { defaultErrorFactory } from "../errors/DefaultErrorFactory";
import { ValidationReport, validationReportFactory } from "../validation-result/ValidationReport";
import { ValidationOptions } from "../ValidationOptions";
import { NumberValidator } from "../validators/NumberValidator";
import { ObjectValidator } from "../validators/ObjectValidator";
import { StringValidator } from "../validators/StringValidator";
import { TimestampValidator } from "../validators/TimestampValidator";

const reportingObjectValidatorOptions = new ValidationOptions<unknown, ValidationReport<unknown>>(defaultErrorFactory, validationReportFactory<unknown>());
const reportingNumberValidatorOptions = new ValidationOptions<number, ValidationReport<number>>(defaultErrorFactory, validationReportFactory<number>());
const reportingStringValidatorOptions = new ValidationOptions<string, ValidationReport<string>>(defaultErrorFactory, validationReportFactory<string>());
const reportingTimestampValidatorOptions = new ValidationOptions<DateTime, ValidationReport<DateTime>>(defaultErrorFactory, validationReportFactory<DateTime>());

/**
 * A collection of default reporting validators that will not throw errors automatically on validation failure, but will keep track of them in a ValidationReport.
 */
export const reportingValidator = {
  objects: new ObjectValidator(reportingObjectValidatorOptions),
  strings: new StringValidator(reportingStringValidatorOptions),
  numbers: new NumberValidator(reportingNumberValidatorOptions),
  timestamps: new TimestampValidator(reportingTimestampValidatorOptions)
};
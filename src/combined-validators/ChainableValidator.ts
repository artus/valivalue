import { DateTime } from "luxon";
import { defaultErrorFactory } from "../errors/DefaultErrorFactory";
import { ValidationOptions } from "../ValidationOptions";
import { NumberValidator } from "../validators/NumberValidator";
import { ObjectValidator } from "../validators/ObjectValidator";
import { StringValidator } from "../validators/StringValidator";
import { TimestampValidator } from "../validators/TimestampValidator";
import { ValidationReport } from "../validation-result/ValidationReport";

/**
 * The ChainableValidator allows you to call multiple validation methods with only 1 validator object.
 * 
 * @class ChainableValidator
 */
export class ChainableValidator {

  readonly results: ValidationReport<unknown>[] = [];
  readonly objects: ObjectValidator<unknown, ChainableValidator>;
  readonly strings: StringValidator<ChainableValidator>;
  readonly numbers: NumberValidator<ChainableValidator>;
  readonly timestamps: TimestampValidator<ChainableValidator>

  /**
   * Construct a new ChainableValidator
   * 
   * @param {boolean} [throwOnFailure=false] - Should the validator throw directly when a validation failure occurs.
   */
  constructor(private readonly throwOnFailure = false) {

    const validationReportFactory = <InputType>() => {
      return (value: InputType, error?: Error): ChainableValidator => {
        const validationReport = new ValidationReport<InputType>(value, error);
        this.add(validationReport);
        return this;
      }
    }

    const validationOptionsFactory = <InputType>() => {
      return new ValidationOptions<InputType, ChainableValidator>(defaultErrorFactory, validationReportFactory<InputType>());
    }

    const objectValidatorOptions = validationOptionsFactory<unknown>();
    const stringValidatorOptions = validationOptionsFactory<string>();
    const numberValidatorOptions = validationOptionsFactory<number>();
    const timestampValidatorOptions = validationOptionsFactory<DateTime>();

    this.objects = new ObjectValidator<unknown, ChainableValidator>(objectValidatorOptions);
    this.strings = new StringValidator<ChainableValidator>(stringValidatorOptions);
    this.numbers = new NumberValidator<ChainableValidator>(numberValidatorOptions);
    this.timestamps = new TimestampValidator<ChainableValidator>(timestampValidatorOptions);
  }

  private add<T>(validationReport: ValidationReport<T>): ChainableValidator {
    if (this.throwOnFailure && validationReport.isFailure()) {
      validationReport.throw();
    }
    this.results.push(validationReport);
    return this;
  }

  /**
   * Check whether all validations (so far) are successful.
   * 
   * @returns {boolean} Indication whether the validations are successful.
   */
  isSuccess(): boolean {
    return this.results.every(result => result.isSuccess());
  }

  /**
   * Check whether any validation (so far) is a failure.
   * 
   * @returns {boolean} Inidication whether any validation is a failure.
   */
  isFailure(): boolean {
    return this.results.some(result => result.isFailure());
  }

  /**
   * Get the list of errors (so far).
   */
  get errors(): Error[] {
    return this.results
      .filter(result => result.isFailure())
      .map(result => result.error!);
  }

  /**
   * In case of any validation failure, throw the first error that occured.
   */
  throw(): void {
    if (this.isFailure()) {
      throw this.errors[0];
    }
  }
}

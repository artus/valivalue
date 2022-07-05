import { DateTime } from "luxon";
import { defaultErrorFactory } from "../errors/DefaultErrorFactory";
import { ValidationOptions } from "../ValidationOptions";
import { NumberValidator } from "../validators/NumberValidator";
import { ObjectValidator } from "../validators/ObjectValidator";
import { StringValidator } from "../validators/StringValidator";
import { TimestampValidator } from "../validators/TimestampValidator";
import { ValidationReport } from "../validation-result/ValidationReport";


export class ChainableValidator {

  readonly results: ValidationReport<unknown>[] = [];
  readonly objects: ObjectValidator<unknown, ChainableValidator>;
  readonly strings: StringValidator<ChainableValidator>;
  readonly numbers: NumberValidator<ChainableValidator>;
  readonly timestamps: TimestampValidator<ChainableValidator>

  constructor() {

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
    this.results.push(validationReport);
    return this;
  }

  isSuccess(): boolean {
    return this.results.every(result => result.isSuccess());
  }

  isFailure(): boolean {
    return this.results.some(result => result.isFailure());
  }

  get errors(): Error[] {
    return this.results
      .filter(result => result.isFailure())
      .map(result => result.error!);
  }

  throw(): void {
    if (this.isFailure()) {
      throw this.errors[0];
    }
  }
}

import { ValidationResultFactory } from "./ValidationResultFactory";

export class ValidationReport<InputType> {

  constructor(
    readonly value: InputType,
    readonly error?: Error
  ) {
    // Do nothing
  }

  isSuccess(): boolean {
    return !this.error;
  }

  isFailure(): boolean {
    return !!this.error;
  }

  throw(): void {
    if (this.isFailure()) {
      throw this.error;
    }
  }
}

export function validationReportFactory <InputType>(): ValidationResultFactory<InputType, ValidationReport<InputType>> {
  return (value, error) => new ValidationReport(value, error);
}
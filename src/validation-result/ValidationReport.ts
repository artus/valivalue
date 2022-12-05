import { ValidationResultFactory } from "./ValidationResultFactory";

/**
 * A ValidationReport holds the result of a validation. 
 * If the validation failed, the report will contain both the value that was validated, and the Error representing the failed validation.
 * If the validation was a success, only the validated value will be embedded.
 * 
 * @class ValidationReport
 */
export class ValidationReport<InputType> {

  constructor(
    readonly value: InputType,
    readonly error?: Error
  ) {
    // Do nothing
  }

  /**
   * Check whether the validation was a success.
   * 
   * @returns {boolean} Indicating whether the validation was a success or not.
   */
  isSuccess(): boolean {
    return !this.error;
  }

  /**
   * Check whether the validation was a failure.
   * 
   * @returns {boolean} Indicating whether the validation was a failure or not.
   */
  isFailure(): boolean {
    return !!this.error;
  }

  /**
   * If the validation was a failure, throw the resulting failed validation Error. 
   * If the validation was a sucess, nothing will be thrown.
   */
  throw(): void {
    if (this.isFailure()) {
      throw this.error;
    }
  }
}

/**
 * A factory to create validationReportFactories with a specific InputType.
 * 
 * @returns {ValidationResultFactory<InputType, ValidationReport<InputType>>}
 */
export function validationReportFactory <InputType>(): ValidationResultFactory<InputType, ValidationReport<InputType>> {
  return (value, error) => new ValidationReport(value, error);
}
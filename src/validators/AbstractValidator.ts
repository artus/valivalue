import { ErrorFactory } from "../errors/ErrorFactory";
import { ValidationResultFactory } from "../validation-result/ValidationResultFactory";
import { ValidationOptions } from "../ValidationOptions";

/**
 * The AbstractValidator supertype provides some default methods that are used by all the child Validators.
 */
export abstract class AbstractValidator<InputType, OutputType> {
  constructor(protected readonly validationOptions: ValidationOptions<InputType, OutputType>) { }

  /**
   * Get the ValidationResultFactory for this validator.
   */
  protected get resultFactory(): ValidationResultFactory<InputType, OutputType> {
    return this.validationOptions.validationResultFactory;
  }

  /**
   * Get the ErrorFactory for this validator.
   */
  protected get errorFactory(): ErrorFactory {
    return this.validationOptions.errorFactory;
  }

  /**
   * Create a failed validation result for provided value and with provided error message.
   * 
   * @param {InputType} value - The value that has been validated.
   * @param {string} errorMessage - The error message for the failed validation.
   * @returns {OutputType} The validation result for a failed validation.
   */
  protected failure(value: InputType, errorMessage: string) {
    return this.resultFactory(value, this.errorFactory(errorMessage));
  }

  /**
   * Create a succesful validation result for provided value.
   * 
   * @param {InputType} value - The value that has been validated.
   * @returns {OutputType} The validation result for a failed validation.
   */
  protected success(value: InputType) {
    return this.resultFactory(value);
  }

  /**
   * Handle the validation for provided value, provided condition and provided error message factory.
   * 
   * @param {InputType} value - The value that needs to be validated.
   * @param {boolean} condition - Whether validation failed or not.
   * @param {() => string} errorMessageFactory - The error message factory. This is an anonymous function that will only be executed in case of failed validation.
   * @returns {OutputType} The result of the validation.
   */
  protected handle(value: InputType, condition: boolean, errorMessageFactory: () => string): OutputType {
    if (condition) {
      return this.failure(value, errorMessageFactory());
    }

    return this.success(value);
  }
}
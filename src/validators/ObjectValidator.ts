import { AbstractValidator } from "./AbstractValidator";
import { errorMessageFactories } from "../error-messages/ErrorMessageFactory";

const {
  objects: objectFactories
} = errorMessageFactories;

const DEFAULT_SUBJECT = "Object";

/**
 * The ObjectValidator is a validator that contains methods to validate values of type object.
 * 
 * @class ObjectValidator<InputType, OutputType>
 */
export class ObjectValidator<InputType, OutputType> extends AbstractValidator<InputType, OutputType> {

  /**
   * Validate whether the provided value is not null.
   * 
   * @param {InputType} value - The value to be validated.
   * @param {string} [subject=Object] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateNotNull(
    value: InputType,
    subject: string = DEFAULT_SUBJECT,
    errorMessageFactory = objectFactories.validateNotNull
  ): OutputType {
    return this.handle(value, value === null, () => errorMessageFactory(subject, value));
  }

  /**
   * Validate whether the provided value is not undefined.
   * 
   * @param {InputType} value - The value to be validated.
   * @param {string} [subject=Object] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateNotUndefined(
    value: InputType,
    subject: string = DEFAULT_SUBJECT,
    errorMessageFactory = objectFactories.validateNotUndefined
  ): OutputType {
    return this.handle(value, value === undefined, () => errorMessageFactory(subject, value));
  }

  /**
   * Validate whether the provided value is not null or undefined.
   * 
   * @param {InputType} value - The value to be validated.
   * @param {string} [subject=Object] - The subject being validated, which will be used in the errorMessageFactory.
   * @param errorMessageFactory - The errorMessageFactory that will be used to construct an error message in case of validation failure.
   * @returns {OutputType} The result of the validation.
   */
  validateNotNullOrUndefined(
    value: InputType,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = objectFactories.validateNotNullOrUndefined
  ): OutputType {
    return this.handle(value, value === null || value === undefined, () => errorMessageFactory(subject, value));
  }
}
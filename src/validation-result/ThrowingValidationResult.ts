import { ValidationResultFactory } from "./ValidationResultFactory";

/**
 * A throwingValidationResult is just a function that receives the result of a validation, either the value itself, or an Error if the validation failed.
 * If an Error is received, the error is thrown. If not, the value is returned.
 * 
 * @returns {(value: InputType, error?: Error) => InputType} A function that will either return the validated value, or throw the failed validation Error.
 */
export function throwingValidationResult<InputType>(): ValidationResultFactory<InputType, InputType> {
  return (value: InputType, error?: Error) => { 
    if (error) {
      throw error; 
    }
    return value;
  };
}
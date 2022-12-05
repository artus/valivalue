import { ErrorFactory } from "./errors/ErrorFactory";
import { ValidationResultFactory } from "./validation-result/ValidationResultFactory";

/**
 * ValidationOptions are a configuration object used to setup validators.
 * 
 * @class ValidationOptions
 */
export class ValidationOptions<InputType, OutputType> {

  constructor(
    readonly errorFactory: ErrorFactory,
    readonly validationResultFactory: ValidationResultFactory<InputType, OutputType>
  ) { }
}
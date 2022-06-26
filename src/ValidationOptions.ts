import { ErrorFactory } from "./errors/ErrorFactory";
import { ValidationResultFactory } from "./validation-result/ValidationResultFactory";

export class ValidationOptions<InputType, OutputType> {

  constructor(
    readonly errorFactory: ErrorFactory,
    readonly validationResultFactory: ValidationResultFactory<InputType, OutputType>
  ) { }
}
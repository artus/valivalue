import { ErrorFactory } from "../errors/ErrorFactory";
import { ValidationResultFactory } from "../validation-result/ValidationResultFactory";
import { ValidationOptions } from "../ValidationOptions";

export abstract class AbstractValidator<InputType, OutputType> {
  constructor(protected readonly validationOptions: ValidationOptions<InputType, OutputType>) { }

  protected get resultFactory(): ValidationResultFactory<InputType, OutputType> {
    return this.validationOptions.validationResultFactory;
  }

  protected get errorFactory(): ErrorFactory {
    return this.validationOptions.errorFactory;
  }

  protected failure(value: InputType, errorMessage: string) {
    return this.resultFactory(value, this.errorFactory(errorMessage));
  }

  protected success(value: InputType) {
    return this.resultFactory(value);
  }

  protected handle(value: InputType, condition: boolean, errorMessageFactory: () => string): OutputType {
    if (condition) {
      return this.failure(value, errorMessageFactory());
    }

    return this.success(value);
  }
}
import { AbstractValidator } from "./AbstractValidator";
import { errorMessageFactories } from "../error-messages/ErrorMessageFactory";

const {
  objects: objectFactories
} = errorMessageFactories;

const DEFAULT_SUBJECT = "Object";

export class ObjectValidator<InputType, OutputType> extends AbstractValidator<InputType, OutputType> {

  validateNotNull(
    value: InputType,
    subject: string = DEFAULT_SUBJECT,
    errorMessageFactory = objectFactories.validateNotNull
  ): OutputType {
    return this.handle(value, value === null, () => errorMessageFactory(subject, value));
  }

  validateNotUndefined(
    value: InputType,
    subject: string = DEFAULT_SUBJECT,
    errorMessageFactory = objectFactories.validateNotUndefined
  ): OutputType {
    return this.handle(value, value === undefined, () => errorMessageFactory(subject, value));
  }

  validateNotNullOrUndefined(
    value: InputType,
    subject = DEFAULT_SUBJECT,
    errorMessageFactory = objectFactories.validateNotNullOrUndefined
  ): OutputType {
    return this.handle(value, value === null || value === undefined, () => errorMessageFactory(subject, value));
  }
}
export class ValidationError extends Error {

  public readonly isValidationError = true;

  constructor(message: string) {
    super(message);
  }
}
const DEFAULT_SUBJECT = 'Number';

export class NumberValidator {

  validateMinValue(value: number, min: number, subject = DEFAULT_SUBJECT): number {
    if (value < min) {
      throw new Error(`${subject} must be higher than ${min}.`);
    }
    return value;
  }

  validateMaxValue(value: number, max: number, subject = DEFAULT_SUBJECT): number {
    if (value > max) {
      throw new Error(`${subject} must be lower than ${max}.`);
    }
    return value;
  }

  validateMinAndMaxValue(value: number, min: number, max: number, subject = DEFAULT_SUBJECT): number {
    if (value < min || value > max) {
      throw new Error(`${subject} must be between ${min} and ${max}.`);
    }
    return value;
  }

  validateIsPositive(value: number, subject = DEFAULT_SUBJECT): number {
    if (value < 0) {
      throw new Error(`${subject} must be positive.`);
    }
    return value;
  }

  validateIsNegative(value: number, subject = DEFAULT_SUBJECT): number {
    if (value >= 0) {
      throw new Error(`${subject} must be negative.`);
    }
    return value;
  }

  validateMustBeDivisibleBy(value: number, divisibleBy: number, subject = DEFAULT_SUBJECT): number {
    if (value % divisibleBy !== 0) {
      throw new Error(`${subject} must be divisible by ${divisibleBy}.`);
    }

    return value;
  }

  validateIsFactorOf(value: number, factorOf: number, subject = DEFAULT_SUBJECT): number {
    if (factorOf % value !== 0) {
      throw new Error(`${subject} must be a factor of ${factorOf}.`);
    }

    return value;
  }
}
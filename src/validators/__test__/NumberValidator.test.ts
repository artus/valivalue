import { defaultErrorFactory } from '../../errors/DefaultErrorFactory';
import { ValidationOptions } from '../../ValidationOptions';
import { NumberValidator } from '../NumberValidator';
import { throwingValidationResult } from '../../validation-result/ThrowingValidationResult';

const VALIDATION_OPTIONS = new ValidationOptions(
  defaultErrorFactory,
  throwingValidationResult<number>()
)
const VALIDATOR = new NumberValidator(VALIDATION_OPTIONS);

describe('NumberValidator', () => {

  describe('validateMinValue', () => {
    test('Should fail validation if number is smaller than supplied minimum value.', () => {
      expect(() => VALIDATOR.validateMinValue(10, 11)).toThrow();
    });

    test('Should not fail validation if number is larger or equal than supplied minimum value.', () => {
      expect(() => VALIDATOR.validateMinValue(11, 10)).not.toThrow();
      expect(() => VALIDATOR.validateMinValue(11, 11)).not.toThrow();
    });
  });

  describe('validateMaxValue', () => {
    test('Should fail validation if number is larger than supplied maximum value.', () => {
      expect(() => VALIDATOR.validateMaxValue(11, 10)).toThrow();
    });

    test('Should not fail validation if number is smaller or equal than supplied maximum value.', () => {
      expect(() => VALIDATOR.validateMaxValue(10, 11)).not.toThrow();
      expect(() => VALIDATOR.validateMaxValue(11, 11)).not.toThrow();
    });
  });

  describe('validateMinAndMaxValue', () => {
    test('Should fail validation if number is smaller than supplied minimum value', () => {
      expect(() => VALIDATOR.validateMinAndMaxValue(10, 11, 20)).toThrow();
    });

    test('Should fail validation if number is larger than supplied maximum value', () => {
      expect(() => VALIDATOR.validateMinAndMaxValue(21, 11, 20)).toThrow();
    });

    test('Should not fail validation if number is between or equal supplied min and maximum value', () => {
      expect(() => VALIDATOR.validateMinAndMaxValue(10, 9, 11)).not.toThrow();
      expect(() => VALIDATOR.validateMinAndMaxValue(10, 10, 11)).not.toThrow();
      expect(() => VALIDATOR.validateMinAndMaxValue(11, 10, 11)).not.toThrow();
      expect(() => VALIDATOR.validateMinAndMaxValue(10, 10, 10)).not.toThrow();
    });
  });

  describe('validateIsPositive', () => {
    test('Should fail validation if number is negative', () => {
      expect(() => VALIDATOR.validateIsPositive(-1)).toThrow();
    });

    test('Should not fail validation if number is positive', () => {
      expect(() => VALIDATOR.validateIsPositive(0)).not.toThrow();
      expect(() => VALIDATOR.validateIsPositive(1)).not.toThrow();
    });
  });

  describe('validateIsNegative', () => {
    test('Should fail validation if number is positive', () => {
      expect(() => VALIDATOR.validateIsNegative(0)).toThrow();
      expect(() => VALIDATOR.validateIsNegative(1)).toThrow();
    });

    test('Should not fail validation if number is negative', () => {
      expect(() => VALIDATOR.validateIsPositive(-1)).toThrow();
    });
  });

  describe('validateIsDivisibleBy', () => {
    test('Should fail validation if number is not divisible by supplied number', () => {
      expect(() => VALIDATOR.validateIsDivisibleBy(10, 3)).toThrow();
    });

    test('Should not fail validation if number is divisible by supplied number.', () => {
      expect(() => VALIDATOR.validateIsDivisibleBy(10, 5)).not.toThrow();
    });
  });

  describe('validateIsFactorOf', () => {
    test('Should fail validation if number is not a factor of supplied number.', () => {
      expect(() => VALIDATOR.validateIsFactorOf(5, 9)).toThrow();
      expect(() => VALIDATOR.validateIsFactorOf(11, 100)).toThrow();
    });

    test('Should not fail validation if number is a factor of supplied number.', () => {
      expect(() => VALIDATOR.validateIsFactorOf(5, 10)).not.toThrow();
      expect(() => VALIDATOR.validateIsFactorOf(11, 110)).not.toThrow();
    });
  });

  describe('validateIsEven', () => {
    test('Should fail validation if supplied number is not even', () => {
      expect(() => VALIDATOR.validateIsEven(1)).toThrow();
      expect(() => VALIDATOR.validateIsEven(1)).toThrow();
    });

    test('Should not fail validation if supplied number is even', () => {
      expect(() => VALIDATOR.validateIsEven(0)).not.toThrow();
      expect(() => VALIDATOR.validateIsEven(2)).not.toThrow();
      expect(() => VALIDATOR.validateIsEven(120)).not.toThrow();
    });
  });

  describe('validateIsOdd', () => {
    test('Should fail validation if supplied number is not odd', () => {
      expect(() => VALIDATOR.validateIsOdd(0)).toThrow();
      expect(() => VALIDATOR.validateIsOdd(2)).toThrow();
    });

    test('Should not fail validation if supplied number is odd', () => {
      expect(() => VALIDATOR.validateIsOdd(1)).not.toThrow();
      expect(() => VALIDATOR.validateIsOdd(111)).not.toThrow();
    });
  });
});
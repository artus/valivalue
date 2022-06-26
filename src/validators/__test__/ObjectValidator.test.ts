import { defaultErrorFactory } from "../../errors/DefaultErrorFactory";
import { throwingValidationResult } from "../../validation-result/ThrowingValidationResult";
import { ValidationOptions } from "../../ValidationOptions";
import { ObjectValidator } from "../ObjectValidator";

const VALIDATOR = new ObjectValidator<unknown, unknown>(new ValidationOptions(
  defaultErrorFactory,
  throwingValidationResult<unknown>()
));

describe('ObjectValidator', () => {
  describe('validateNotNull', () => {
    test('Should fail if supplied object is null', () => {
      expect(() => VALIDATOR.validateNotNull(null)).toThrow();
    });

    test('Should not fail if supplied object is not null', () => {
      expect(() => VALIDATOR.validateNotNull({})).not.toThrow();
      expect(() => VALIDATOR.validateNotNull(undefined)).not.toThrow();
    });
  });

  describe('validateNotUndefined', () => {
    test('Should fail if supplied object is undefined', () => {
      expect(() => VALIDATOR.validateNotUndefined(undefined)).toThrow();
    });

    test('Should not fail if supplied object is not undefined', () => {
      expect(() => VALIDATOR.validateNotUndefined(null)).not.toThrow();
      expect(() => VALIDATOR.validateNotUndefined({})).not.toThrow();
    });
  });

  describe('validateNotNullOrUndefined', () => {
    test('Should fail if supplied object is null or undefined', () => {
      expect(() => VALIDATOR.validateNotNullOrUndefined(null)).toThrow();
      expect(() => VALIDATOR.validateNotNullOrUndefined(undefined)).toThrow();
    });

    test('Should not fail if supplied object is not null or not undefined', () => {
      expect(() => VALIDATOR.validateNotNullOrUndefined({})).not.toThrow();
    });
  });
});
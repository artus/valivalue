import { DateTime } from "luxon";
import { defaultErrorFactory } from "../../errors/DefaultErrorFactory";
import { throwingValidationResult } from "../../validation-result/ThrowingValidationResult";
import { ValidationOptions } from "../../ValidationOptions";
import { TimestampValidator } from "../TimestampValidator";

const VALIDATOR = new TimestampValidator(
  new ValidationOptions(
    defaultErrorFactory,
    throwingValidationResult<DateTime>()
  )
);

const TEST_VALUES = {
  IN_PAST: DateTime.fromISO('2000-01-01T00:00:00.000Z'),
  IN_FUTURE: DateTime.fromISO('2100-01-01T00:00:00.000Z')
}


describe('TimestampValidator', () => {
  describe('validateIsAfter', () => {
    test('Should fail if the supplied timestamp is not after supplied limit', () => {
      expect(() => VALIDATOR.validateIsAfter(TEST_VALUES.IN_PAST, TEST_VALUES.IN_FUTURE)).toThrow();
    });

    test('Should not fail if the supplied timestamp is after the supplied limit', () => {
      expect(() => VALIDATOR.validateIsAfter(TEST_VALUES.IN_FUTURE, TEST_VALUES.IN_PAST)).not.toThrow();
    });
  });

  describe('validateIsBefore', () => {
    test('Should fail if the supplied timestamp is after the supplied limit', () => {
      expect(() => VALIDATOR.validateIsBefore(TEST_VALUES.IN_FUTURE, TEST_VALUES.IN_PAST)).toThrow();
    });

    test('Should not fail if the supplied timestamp is before the supplied limit.', () => {
      expect(() => VALIDATOR.validateIsBefore(TEST_VALUES.IN_PAST, TEST_VALUES.IN_FUTURE)).not.toThrow();
    });
  });

  describe('validateIsInPast', () => {
    test('Should fail if the supplied timestamp is in the future', () => {
      expect(() => VALIDATOR.validateIsInPast(TEST_VALUES.IN_FUTURE)).toThrow();
    });

    test('Should not fail if supplied timestamp is in the past', () => {
      expect(() => VALIDATOR.validateIsInPast(TEST_VALUES.IN_PAST)).not.toThrow();
    });
  });

  describe('validateIsInFuture', () => {
    test('Should fail if supplied timestamp is in the past', () => {
      expect(() => VALIDATOR.validateIsInFuture(TEST_VALUES.IN_PAST)).toThrow();
    });

    test('Should not fail if supplied timestamp is in the future', () => {
      expect(() => VALIDATOR.validateIsInFuture(TEST_VALUES.IN_FUTURE)).not.toThrow();
    });
  })
});
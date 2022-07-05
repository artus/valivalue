import { DateTime } from "luxon";
import { ChainableValidator } from "../ChainableValidator";

let VALIDATOR: ChainableValidator;

describe('ChainableValidator', () => {

  beforeEach(() => {
    VALIDATOR = new ChainableValidator();
  })

  describe('internal validators', () => {
    test('Should return itself after running a specific validation', () => {
      const result = VALIDATOR
        .strings.validateNotEmpty('test')
        .numbers.validateIsNegative(-1)
        .objects.validateNotNull({})
        .timestamps.validateIsInPast(DateTime.fromISO('2020-01-01T00:00:00.000Z'));

      expect(result.isSuccess()).toBe(true);
      expect(result.isFailure()).toBe(false);
      expect(result.errors).toStrictEqual([]);
    });

    test('Should keep track of results', () => {
      const result = VALIDATOR
        .strings.validateNotEmpty('')
        .numbers.validateIsNegative(1)
        .objects.validateNotNull(null)
        .timestamps.validateIsInPast(DateTime.fromISO('2120-01-01T00:00:00.000Z'));

      expect(result.isSuccess()).toBe(false);
      expect(result.isFailure()).toBe(true);
      expect(result.errors.length).toBe(4);
    });
  });

  describe('throw', () => {
    test('Should throw the first validation error if validation failed', () => {
      const result = VALIDATOR
        .strings.validateNotEmpty('')
        .numbers.validateIsNegative(1)
        .objects.validateNotNull(null)
        .timestamps.validateIsInPast(DateTime.fromISO('2120-01-01T00:00:00.000Z'));

      expect(() => result.throw()).toThrow('String must not be empty.');
    });

    test('Should not throw if validation was successful', () => {
      const result = VALIDATOR
        .strings.validateNotEmpty('not empty')
        .numbers.validateIsNegative(-1)
        .objects.validateNotNull({})
        .timestamps.validateIsInFuture(DateTime.fromISO('2120-01-01T00:00:00.000Z'));

      expect(() => result.throw()).not.toThrow();
    });
  });

  describe('throwOnFailure', () => {
    test('Should throw on the first failure', () => {
      expect(() => {
        new ChainableValidator(true)
          .strings.validateNotEmpty("")
          .numbers.validateIsEven(1);
      }).toThrow('String must not be empty.');
    });
  });
});
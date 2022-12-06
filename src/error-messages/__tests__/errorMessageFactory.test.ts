import { DateTime } from "luxon";
import { errorMessageFactories } from "../ErrorMessageFactory";

const {
  numbers,
  strings,
  objects,
  timestamps
} = errorMessageFactories;

const TEST_VALUES = {
  NUMBER: 1337,
  STRING: "Some test string",
  OBJECT: {},
  TIMESTAMP: DateTime.fromISO('2022-01-01T00:00:00.000Z')
};

const TEST_SUBJECTS = {
  NUMBER: "Number",
  STRING: "String",
  OBJECT: "Object",
  TIMESTAMP: "Timestamp"
};

const OTHER_TIMESTAMP = DateTime.fromISO('2018-01-01T00:00:00.000Z');

describe('errorMessageFactory', () => {
  test('numbers', () => {
    expect(numbers.validateMinValue(TEST_SUBJECTS.NUMBER, TEST_VALUES.NUMBER, 2000))
      .toBe('Number must not be lower than 2000.');
    expect(numbers.validateMaxValue(TEST_SUBJECTS.NUMBER, TEST_VALUES.NUMBER, 200))
      .toBe('Number must not be higher than 200.');
    expect(numbers.validateMinAndMaxValue(TEST_SUBJECTS.NUMBER, TEST_VALUES.NUMBER, 200, 2000))
      .toBe('Number must not be lower than 200 and must not be higher than 2000.');
    expect(numbers.validateIsPositive(TEST_SUBJECTS.NUMBER, TEST_VALUES.NUMBER))
      .toBe('Number must be a positive number.');
    expect(numbers.validateIsNegative(TEST_SUBJECTS.NUMBER, TEST_VALUES.NUMBER))
      .toBe('Number must be a negative number.');
    expect(numbers.validateIsDivisibleBy(TEST_SUBJECTS.NUMBER, TEST_VALUES.NUMBER, 2))
      .toBe('Number must be divisible by 2.');
    expect(numbers.validateIsFactorOf(TEST_SUBJECTS.NUMBER, TEST_VALUES.NUMBER, 2000))
      .toBe('Number must be a factor of 2000.');
    expect(numbers.validateIsEven(TEST_SUBJECTS.NUMBER, TEST_VALUES.NUMBER))
      .toBe('Number must be even.');
    expect(numbers.validateIsOdd(TEST_SUBJECTS.NUMBER, TEST_VALUES.NUMBER))
      .toBe('Number must be odd.');
    expect(numbers.validateEquals(TEST_SUBJECTS.NUMBER, TEST_VALUES.NUMBER, 3))
      .toBe('Number must be 3.');
  });

  test('strings', () => {
    expect(strings.validateNotEmpty(TEST_SUBJECTS.STRING, TEST_VALUES.STRING))
      .toBe('String must not be empty.');
    expect(strings.validateMinLength(TEST_SUBJECTS.STRING, TEST_VALUES.STRING, 2))
      .toBe('String must at least be 2 character(s) long.');
    expect(strings.validateMaxLength(TEST_SUBJECTS.STRING, TEST_VALUES.STRING, 2))
      .toBe('String can not have more than 2 character(s).');
    expect(strings.validateMinAndMaxLength(TEST_SUBJECTS.STRING, TEST_VALUES.STRING, 2, 20))
      .toBe('String must be between 2 and 20 characters long.');
    expect(strings.validateDoesNotContain(TEST_SUBJECTS.STRING, TEST_VALUES.STRING, 'forbidden'))
      .toBe("String can not contain 'forbidden'.");
    expect(strings.validateResemblesEmail(TEST_SUBJECTS.STRING, TEST_VALUES.STRING))
      .toBe('String must be an email address.');
    expect(strings.validateEquals(TEST_SUBJECTS.STRING, TEST_VALUES.STRING, "whatever"))
      .toBe("String must be 'whatever'.");
    expect(strings.validateLengthEquals(TEST_SUBJECTS.STRING, TEST_VALUES.STRING, 3))
      .toBe("String must be 3 character(s) long.");
  });

  test('objects', () => {
    expect(objects.validateNotNull(TEST_SUBJECTS.OBJECT, TEST_VALUES.OBJECT))
      .toBe('Object can not be null.');
    expect(objects.validateNotUndefined(TEST_SUBJECTS.OBJECT, TEST_VALUES.OBJECT))
      .toBe('Object can not be undefined.');
    expect(objects.validateNotNullOrUndefined(TEST_SUBJECTS.OBJECT, TEST_VALUES.OBJECT))
      .toBe('Object can not be null or undefined.');
  });
  
  test('timestamps', () => {
    const validateAfterErrorMessage = timestamps.validateIsAfter(TEST_SUBJECTS.TIMESTAMP, TEST_VALUES.TIMESTAMP, OTHER_TIMESTAMP);
    const validateBeforeErrorMessage = timestamps.validateIsBefore(TEST_SUBJECTS.TIMESTAMP, TEST_VALUES.TIMESTAMP, OTHER_TIMESTAMP);

    expect(validateAfterErrorMessage.indexOf('Timestamp must be after'))
      .toBe(0);
    expect(validateBeforeErrorMessage.indexOf('Timestamp must be before'))
      .toBe(0);
    expect(timestamps.validateIsInPast(TEST_SUBJECTS.TIMESTAMP, TEST_VALUES.TIMESTAMP))
      .toBe('Timestamp must be in the past.');
    expect(timestamps.validateIsInFuture(TEST_SUBJECTS.TIMESTAMP, TEST_VALUES.TIMESTAMP))
      .toBe('Timestamp must be in the future.');
  });

});
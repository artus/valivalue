import { throwingValidationResult } from "../ThrowingValidationResult";

const TEST_ERROR = new Error('Test error');

describe('ThrowingValidationResult', () => {
  test('Should return a function that throws the supplied error.', () => {
    expect(() => throwingValidationResult<string>()('test', TEST_ERROR)).toThrow(TEST_ERROR);
  });

  test('Should return a function that returns the value if no error is supplied.', () => {
    expect(throwingValidationResult<string>()('test')).toBe('test');
  })
});
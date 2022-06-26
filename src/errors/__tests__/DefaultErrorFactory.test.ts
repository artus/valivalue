import { defaultErrorFactory } from "../DefaultErrorFactory";

const EXPECTED_ERROR_MESSAGE = 'Some test error message';

describe('DefaultErrorFactory', () => {
  test('Shoud return an Error with supplied error message', () => {
    const result = defaultErrorFactory(EXPECTED_ERROR_MESSAGE);
    expect(result instanceof Error).toBe(true);
    expect(result.message).toBe(EXPECTED_ERROR_MESSAGE);
  });
});
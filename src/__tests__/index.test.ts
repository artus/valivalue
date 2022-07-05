import valivalue, { validators } from "..";

describe('index', () => {
  test('Should export a preconfigured validators', () => {
    expect(validators.chainable()).not.toBeUndefined();
    expect(validators.default).not.toBeUndefined();
    expect(validators.reporting).not.toBeUndefined();
  });

  test('Should export a preconfigured throwing validator by default', () => {
    expect(() => valivalue.numbers.validateIsEven(1)).toThrow();
  });
});
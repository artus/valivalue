import valivalue, { chainable, reporting } from "..";

describe('index', () => {
  test('Should export a preconfigured validators', () => {
    expect(chainable()).not.toBeUndefined();
    expect(reporting).not.toBeUndefined();
  });

  test('Should export a preconfigured throwing validator by default', () => {
    expect(() => valivalue.numbers.validateIsEven(1)).toThrow();
  });
});
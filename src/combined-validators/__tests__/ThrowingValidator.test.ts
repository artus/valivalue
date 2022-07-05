import { DateTime } from "luxon";
import { throwingValidator } from "../ThrowingValidator";

describe('ThrowingValidator', () => {
  test.each([
    [() => throwingValidator.strings.validateNotEmpty('')],
    [() => throwingValidator.numbers.validateIsEven(1)],
    [() => throwingValidator.objects.validateNotNull(null)],
    [() => throwingValidator.timestamps.validateIsInFuture(DateTime.fromISO("2000-01-01T00:00:00.000Z"))]
  ])(`Should use validators that throw on failed validation`, (validation) => {
    expect(validation).toThrow();
  });
});
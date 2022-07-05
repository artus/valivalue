import { DateTime } from "luxon";
import { reportingValidator } from "../ReportingValidator";

describe('ReportingValidator', () => {

  test.each([
    [reportingValidator.numbers.validateIsEven(1)],
    [reportingValidator.strings.validateMaxLength("test",1)],
    [reportingValidator.timestamps.validateIsInFuture(DateTime.fromISO("2000-01-01T00:00:00.000Z"))],
    [reportingValidator.objects.validateNotNull(null)]
  ])(`Should use validators that return reports`, (result) => {
    expect(result.isFailure()).toBe(true);
  });
});
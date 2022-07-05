import { ValidationReport, validationReportFactory } from "../ValidationReport";

describe('ValidationReport', () => {
  describe('isSuccess', () => {
    test('Should return true if the ValidationReport is successful.', () => {
      expect(new ValidationReport("success").isSuccess()).toBe(true);
    });

    test('Should return false if the ValidationReport is a failure.', () => {
      expect(new ValidationReport("failure", new Error('test error')).isSuccess()).toBe(false);
    });
  });

  describe('isFailure', () => {
    test('Should return false if the ValidationReport is successful.', () => {
      expect(new ValidationReport("success").isFailure()).toBe(false);
    });

    test('Should return true if the ValidationReport is a failure.', () => {
      expect(new ValidationReport("failure", new Error('test error')).isFailure()).toBe(true);
    });
  });

  describe('throw', () => {
    test('Should throw when the ValidationReport is a failure.', () => {
      expect(() => new ValidationReport("failure", new Error("test")).throw()).toThrow("test");
    });

    test('Should not throw when the ValidationReport is successful.', () => {
      expect(() => new ValidationReport("failure").throw()).not.toThrow();
    });
  });
});

describe('validationReportFactory', () => {
  test('Should return a validationReportFactory for supplied InputType', () => {
    const stringValidationReportFactory = validationReportFactory<string>();
    const validationReport = stringValidationReportFactory("test");
    expect(validationReport.isSuccess()).toBe(true);
  });
});
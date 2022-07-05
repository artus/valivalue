import { defaultErrorFactory } from "../../errors/DefaultErrorFactory";
import { throwingValidationResult } from "../../validation-result/ThrowingValidationResult";
import { ValidationOptions } from "../../ValidationOptions";
import { StringValidator } from "../StringValidator";

const VALIDATOR = new StringValidator(
  new ValidationOptions(
    defaultErrorFactory,
    throwingValidationResult<string>()
  )
);

describe('StringValidator', () => {
  describe('validateNotEmpty', () => {
    test('Should fail when we supply an empty string', () => {
      expect(() => VALIDATOR.validateNotEmpty('')).toThrow();
      expect(() => VALIDATOR.validateNotEmpty(' ')).toThrow();
      expect(() => VALIDATOR.validateNotEmpty(' ')).toThrow();
    });

    test('Should not fail when we supply a string that is not empty', () => {
      expect(() => VALIDATOR.validateNotEmpty(' this is a test ')).not.toThrow();
    });
  });

  describe('validateMinLength', () => {
    test('Should fail when the supplied string does not have at least a length of supplied minimum', () => {
      expect(() => VALIDATOR.validateMinLength("a", 2)).toThrow();
      expect(() => VALIDATOR.validateMinLength("", 1)).toThrow();
    });

    test('Should not fail when the supplied string is longer than supplied minimum', () => {
      expect(() => VALIDATOR.validateMinLength('t', 1)).not.toThrow();
      expect(() => VALIDATOR.validateMinLength('tt', 2)).not.toThrow();
      expect(() => VALIDATOR.validateMinLength('ttt', 2)).not.toThrow();
    });
  });

  describe('validateMaxLength', () => {
    test('Should fail when supplied string has a length greater than supplied maximum', () => {
      expect(() => VALIDATOR.validateMaxLength('ttt', 2)).toThrow();
      expect(() => VALIDATOR.validateMaxLength('tt', 1)).toThrow();
      expect(() => VALIDATOR.validateMaxLength('t', 0)).toThrow();
    });

    test('Should not fail when supplied string has a length smaller than supplied maximum', () => {
      expect(() => VALIDATOR.validateMaxLength('', 1)).not.toThrow();
      expect(() => VALIDATOR.validateMaxLength('t', 1)).not.toThrow();
      expect(() => VALIDATOR.validateMaxLength('tt', 2)).not.toThrow();
      expect(() => VALIDATOR.validateMaxLength('tt', 3)).not.toThrow();
    });
  });

  describe('validateMinAndMaxLength', () => {
    test('Should fail when supplied string is shorter or longer than supplied limits', () => {
      expect(() => VALIDATOR.validateMinAndMaxLength('', 1, 3)).toThrow();
      expect(() => VALIDATOR.validateMinAndMaxLength('t', 2, 3)).toThrow();
      expect(() => VALIDATOR.validateMinAndMaxLength('tttt', 2, 3)).toThrow();
    });


    test('Should not fail when supplied string length is within than supplied limits', () => {
      expect(() => VALIDATOR.validateMinAndMaxLength('tt', 2, 3)).not.toThrow();
      expect(() => VALIDATOR.validateMinAndMaxLength('ttt', 2, 3)).not.toThrow();
      expect(() => VALIDATOR.validateMinAndMaxLength('ttt', 2, 4)).not.toThrow();
    });
  });

  describe('validateDoesNotContain', () => {
    test('Should fail if supplied string contains forbidden value(s)', () => {
      expect(() => VALIDATOR.validateDoesNotContain('test', 'test')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContain('test', 'est')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContain('test', 'st')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContain('test', 't')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContain('test', 'te')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContain('test', 'tes')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContain('Test', 'Tes')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContain('Test', ['foo', 'Tes'])).toThrow();
    });

    test('Should not fail if supplied string does not contain forbidden value(s)', () => {
      expect(() => VALIDATOR.validateDoesNotContain('test', 'foo')).not.toThrow();
      expect(() => VALIDATOR.validateDoesNotContain('test', ['foo', 'Test'])).not.toThrow();
    });
  });

  describe('validateDoesNotContainCaseInsensitive', () => {
    test('Should fail if supplied string contains forbidden value(s)', () => {
      expect(() => VALIDATOR.validateDoesNotContainCaseInsensitive('test', 'teSt')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContainCaseInsensitive('test', 'eSt')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContainCaseInsensitive('test', 'sT')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContainCaseInsensitive('test', 'T')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContainCaseInsensitive('test', 'Te')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContainCaseInsensitive('test', 'tEs')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContainCaseInsensitive('Test', 'tes')).toThrow();
      expect(() => VALIDATOR.validateDoesNotContainCaseInsensitive('Test', ['foo', 'tes'])).toThrow();
    });

    test('Should not fail if supplied string does not contain forbidden value(s)', () => {
      expect(() => VALIDATOR.validateDoesNotContainCaseInsensitive('test', 'foo')).not.toThrow();
      expect(() => VALIDATOR.validateDoesNotContainCaseInsensitive('test', ['foo'])).not.toThrow();
    });
  });

  describe('validateResemblesEmail', () => {
    test('Should fail if the supplied string does not resemble an email', () => {
      expect(() => VALIDATOR.validateResemblesEmail('@')).toThrow();
      expect(() => VALIDATOR.validateResemblesEmail('test')).toThrow();
      expect(() => VALIDATOR.validateResemblesEmail('test@')).toThrow();
      expect(() => VALIDATOR.validateResemblesEmail('@test@')).toThrow();
    });

    test('Should not fail if the supplied string resembles an email', () => {
      expect(() => VALIDATOR.validateResemblesEmail('john@foo.bar')).not.toThrow();
      expect(() => VALIDATOR.validateResemblesEmail('john@foo')).not.toThrow();
      expect(() => VALIDATOR.validateResemblesEmail('j@f')).not.toThrow();
    });
  });
})
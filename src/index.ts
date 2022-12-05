import { ChainableValidator } from "./combined-validators/ChainableValidator";
import { reportingValidator } from "./combined-validators/ReportingValidator";
import { throwingValidator } from "./combined-validators/ThrowingValidator";

/**
 * The reporting validator does not throw on failed validation, but returns a ValidationReport which holds the result.
 */
export const reporting = reportingValidator;

/**
 * The chainable validator can always returns itself, so you can chain validation methods.
 * 
 * @param {boolean} [throwOnFailure=false] - Whether the validator should throw directly on failed validation.
 * @returns {ChainableValidator} The created chainable validator.
 */
export const chainable = (throwOnFailure = false) => new ChainableValidator(throwOnFailure);

/**
 * The throwing validator throws directly on failed validation.
 */
export default throwingValidator;
import { ChainableValidator } from "./combined-validators/ChainableValidator";
import { reportingValidator } from "./combined-validators/ReportingValidator";
import { throwingValidator } from "./combined-validators/ThrowingValidator";

export const reporting = reportingValidator;
export const chainable = (throwOnFailure = false) => new ChainableValidator(throwOnFailure);

export default throwingValidator;
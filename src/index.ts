import { ChainableValidator } from "./combined-validators/ChainableValidator";
import { reportingValidator } from "./combined-validators/ReportingValidator";
import { throwingValidator } from "./combined-validators/ThrowingValidator";

export const reporting = reportingValidator;
export const chainable = () => new ChainableValidator();

export default throwingValidator;
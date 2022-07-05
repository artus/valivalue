import { ChainableValidator } from "./combined-validators/ChainableValidator";
import { reportingValidator } from "./combined-validators/ReportingValidator";
import { throwingValidator } from "./combined-validators/ThrowingValidator";

export const validators = {
  default: throwingValidator,
  reporting: reportingValidator,
  chainable: () => new ChainableValidator()
}

export default throwingValidator;
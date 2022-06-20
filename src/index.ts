import { NumberValidator } from "./validators/NumberValidator";
import { ObjectValidator } from "./validators/ObjectValidator";
import { StringValidator } from "./validators/StringValidator";
import { TimestampValidator } from "./validators/TimestampValidator";

export class Validator {
  constructor(
    readonly objects = new ObjectValidator(),
    readonly strings = new StringValidator(objects),
    readonly numbers = new NumberValidator(),
    readonly timestamps = new TimestampValidator(objects)
  ) {
    // Do nothing
  }
}

export default new Validator();
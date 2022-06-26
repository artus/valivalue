import { ValidationResultFactory } from "./ValidationResultFactory";

export function throwingValidationResult<InputType>(): ValidationResultFactory<InputType, InputType> {
  return (value: InputType, error?: Error) => { 
    if (error) {
      throw error; 
    }
    return value;
  };
}
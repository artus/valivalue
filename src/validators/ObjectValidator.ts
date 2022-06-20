export class ObjectValidator {
  validateNotNull<T>(value: T | null | undefined, subject: string = "Object"): T {
    if (value === null) {
      throw new Error(`${subject} is null.`);
    } 
    
    if (value === undefined) {
      throw new Error(`${subject} is undefined.`);
    }

    return value;
  }
}
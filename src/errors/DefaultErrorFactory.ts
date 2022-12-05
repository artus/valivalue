import { ErrorFactory } from "./ErrorFactory";
import { ValidationError } from "./ValidationError";

/**
 * The deafult erorr factory, which takes an error message and returns a newly constructed Error for that message.
 * 
 * @param {string} message - The error message that should be thrown.
 * @returns {Error} The constructed error.
 */
export const defaultErrorFactory: ErrorFactory = (message: string) => new ValidationError(message);
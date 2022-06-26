import { ErrorFactory } from "./ErrorFactory";

export const defaultErrorFactory: ErrorFactory = (message: string) => new Error(message);
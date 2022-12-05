/**
 * An ErrorFactory is a function that takes in an error message and constructs a new Error based on that value.
 * A defaultErrorFactory is included in this package that just constructs a standard javascript Error, 
 * but you can implement your own if you have other needs or use a domain-specific Error in your application.
 */
export type ErrorFactory = (message: string) => Error;
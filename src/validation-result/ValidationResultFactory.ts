/**
 * A ValidationResultFactory maps an InputType to an OutputType.
 */
export type ValidationResultFactory<InputType, OutputType> = (value: InputType, error?: Error) => OutputType;
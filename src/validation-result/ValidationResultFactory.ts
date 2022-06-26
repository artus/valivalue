export type ValidationResultFactory<InputType, OutputType> = (value: InputType, error?: Error) => OutputType;
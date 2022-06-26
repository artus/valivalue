# ValiValue

Easy and opinionated validation.

## Installation

```shell
npm install valivalue
```

## Usage

ValiValue exports a default validator that can be used to perform some pre-implemented validations on:

 - objects
 - strings
 - numbers
 - timestamps ([Luxon](https://moment.github.io/luxon/#/) [DateTime](https://moment.github.io/luxon/api-docs/index.html#datetime))

Validation methods follow a simple format:

```js
validator.[type].[method]([value to validate], [validation parameter, ...], [subject])

// examples
validator.timestamps.validateIsInFuture(DateTime.fromMillis(), "Delivery date");
validator.strings.validateMinAndMaxLength("John", 2, 64, "First name");
```

If validation fails, an error will be thrown with a human-readable message:

```js
import validator from "valivalue";

// Throws error with message "My object is null.".
validator.objects.validateNotNull(null, "My object");

// Throws error with message "Your object is undefined.".
validator.objects.validateNotNull(null, "Your object");

// Throws error with message "Age must be a positive number.".
validator.numbers.validateIsPositive(-1, "Age");
```

Values that are nullable (objects, strings and timestamps) are automatically validated that they are not `null` or `undefined`.

```js
// Throws error with message "String must be 2 character(s) long.".
validator.strings.validateMinLength(null, 2);

// Throws error with message "Birth date must be in the past.".
validator.timestamps.validateIsInPast(undefined, "Birth date");
```
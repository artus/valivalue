# ValiValue

Easy and opinionated validation.

## Installation

```shell
npm install valivalue
```

## Usage

### Default validator

ValiValue exports a default validator that can be used to perform some pre-implemented validations on:

 - objects
 - strings
 - numbers
 - timestamps ([Luxon](https://moment.github.io/luxon/#/) [DateTime](https://moment.github.io/luxon/api-docs/index.html#datetime))

Validation methods follow a simple format:

```js
validator.[type].[method]([value to validate], [validation parameter, ...], [subject], [error message factory])

// examples
import valivalue from "valivalue";

validator.timestamps.validateIsInFuture(DateTime.fromMillis(), "Delivery date");
validator.strings.validateMinAndMaxLength("John", 2, 64, "First name");
validator.numbers.validateMinValue(
  5, 
  12, 
  'Age', 
  (subject, value, min) => `${subject} should at least be ${min}, but was ${value}.`
);
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

Values that are nullable (objects, strings and timestamps) are *not* automatically validated that they are not `null` or `undefined`. You should validate this using the `objects` validator:

```js
import valivalue from "valivalue";

valivalue.objects.validateNotNull(null);
valivalue.objects.validateNotUndefined(undefined);
valivalue.objects.validateNotNullOrUndefined({});
```

`null` and `undefined` are 2 different things for the `objects` validator.

### Reporting validator

Valivalue also exports a `reporting` validator, which does not throw but returns an error report:

```js
import { reporting } from "valivalue";

const { numbers } = reporting;

const validationReport = numbers.validateIsEven(1);

const isSuccess = validationReport.isSuccess();
const isFailure = validationReport.isFailure();
const validatedValue = validationReport.value;
const validationError = validationReport.error;

validationReport.throw(); // Only throws if the validation failed.
```

### Chainable validator

Valivalue also exports a `chainable` validator, which returns itself after each validation and keeps track of all validation failures:

```js
import { chainable } from "valivalue";

const firstName = "Some input value";

const result = chainable()
                  .objects.validateNotNullOrUndefined(firstName, 'First name')
                  .strings.validateMinAndMaxLength(firstName, 1, 32, 'First name')
                  .strings.validateDoesNotContainCaseInsensitive(firstName, [ /* a list of swear words */], 'First name');

if (result.isFailure()) {
  console.error('Validation failed', results.errors);
}
```
If you call `throw` on the `chainable` validator, the first validation error is thrown.

You can also configure the `chainable` validator to throw directly on a failed validation:

```js
import { chainable } from "valivalue";

chainable(true)
  .strings.validateNotEmpty("") // Throws directly, does not continue validation
  .numbers.validateIsEven(1);
```
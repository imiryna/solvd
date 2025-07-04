# JS Utils Library

JavaScript library that provides advanced data transformation functions.

## Installation

sudo npm link

## Usage

## ES Modules

```js
import { addValues, coerceType, invertBool, stringifyValue, convertToNumber, extendStringPrototype } from "hw2_lib";
```

`extendStringPrototype(); // this enables String.prototype format`

## CommonJS

```js
const { addValues, coerceType, invertBool, stringifyValue, convertToNumber, extendStringPrototype } = require("hw2_libe");
```

`extendStringPrototype(); // this enables String.prototype format`

## addValues(a, b)

Adds two values together. Check for all possible types of addends

## coerceType(value, type)

Converts a value to a specific type ('string', 'number', 'boolean').

## invertBool(value)

Inverts a boolean value.

## stringifyValue(value)

Converts a value to its JSON string representation.

### `String.prototype.format(...args)`

Extends the native String object with `.format(...)`:

```js
"Hello, {0}!".format("World"); // "Hello, World!"
```

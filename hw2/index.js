/* 
Create a JavaScript library that provides advanced data transformation functions. 
The library should include the following features:

addValues: Accepts two arguments of any type and performs the appropriate addition operation
based on the types of the arguments. The function should return the result of the addition. 
If the addition is not possible, it should throw an error. */

// 1. Check on typeOf
// 2. hendel of error
// 3. performs the appropriate addition operation based on the types of the arguments.

function addValues(par1, par2) {
  //handle of error
  if (par1 === null || par1 === null) {
    throw new Error("One of the arguments is null");
  }

  // Strings
  if (typeof par1 === "string" || typeof par2 === "string") return String(par1) + String(par2);

  // //handle of type error
  if (typeof par1 !== typeof par2) {
    throw new Error("Invalid data types for addition.");
  }

  // performs the appropriate addition

  //Numbers
  if (typeof par1 === "number" && typeof par2 === "number") return par1 + par2;

  // BigInts
  if (typeof par1 === "bigint" && typeof par2 === "bigint") {
    return par1 + par2;
  }

  // Arrays
  if (Array.isArray(par1) && Array.isArray(par2)) return [...par1, ...par2];

  // Objects
  if (typeof par1 === "object" && typeof par2 === "object") return { ...par1, ...par2 };
}

/* 
stringifyValue: Accepts a single argument of any type and converts it to a string representation.
For objects and arrays, use JSON.stringify() for serialization. 
For other types, use the appropriate built-in methods or operations to convert them to strings. 
*/

function stringifyValue(arg) {
  const argTypeOf = typeof arg;

  // to cast primitive types

  switch (argTypeOf) {
    case "boolean":
    case "string":
    case "number":
    case "bigInt":
      return String(arg);

    case "symbol":
      return arg.toString();

    case "undefined":
      return "undefined";

    // to cast object type (object, array)

    case "object":
      if (arg === null) return "null";
      try {
        return JSON.stringify();
      } catch (error) {
        throw new Error("Unable to stringify object");
      }

    default:
      throw new Error("Unsupported data types for ");
  }
}

/* 
invertBoolean: Accepts a single boolean argument and returns its inverted value.
If the argument is not a boolean, it should throw an error.
*/

function invertBoolean(arg) {
  const bool = arg;

  if (typeof arg !== "boolean") {
    throw new Error("The argument is not a boolean");
  }

  return !bool;
}

/* 
convertToNumber: Accepts a single argument of any type and attempts to convert it to a number. 
For strings, use parseFloat() or parseInt() for conversion. 
For other types, use appropriate operations or functions to perform the conversion. 
If the conversion is not possible, it should throw an error.
*/

function convertToNumber(arg) {
  // strings
  if (typeof arg === "string") {
    return parseInt(arg);
  }

  // numbers
  if (typeof arg === "number") {
    return arg;
  }

  // Symbols throw a TypeError.
  if (typeof arg === "bigint") {
    const limit = Number.MAX_SAFE_INTEGER;

    if (arg > limit) {
      throw new Error("Too big to be a Number");
    } else {
      return Number(arg);
    }
  }

  // boolean
  if (typeof arg === "boolean") {
    return Number(arg);
  }

  // objects
  if (typeof arg === "object") {
    throw new Error("Invalid data type for conversion");
  }
}

/* 
coerceToType: Accepts two arguments: value and type. 
It attempts to convert the value to the specified type using type coercion. 
The function should return the coerced value if successful. 
If the coercion is not possible, it should throw an error.
*/

function coerceToType(value, type) {
  switch (type) {
    case "string":
      try {
        return stringifyValue(value);
      } catch (error) {
        throw new Error(`It is not possible to coerce to ${type}`);
      }

    case "number":
      try {
        return convertToNumber(value);
      } catch (error) {
        throw new Error(`It is not possible to coerce to ${type}`);
      }

    case "boolean":
      return Boolean(value);

    default:
      throw new Error(`Unsupported coercion type: ${type}`);
  }
}

/* Test cases for the addValues function */

const testCases = [
  [2, 3],
  ["Hello, ", "World!"],
  ["Value: ", 42],
  [
    [1, 2],
    [3, 4],
  ],
  [{ a: 1 }, { b: 2 }],
  [10n, 20n],
  ["abc", true],
  ["abc", null],
  ["abc", undefined],
  [5, "abc"],
  [5, null],
  [null, undefined],
  [1, {}],
  [[1, 2], { x: 1 }],
  [Symbol("a"), Symbol("b")],
  [10n, 5],
];

testCases.forEach(([a, b], i) => {
  try {
    const result = addValues(a, b);
    console.log(`✅ Test ${i + 1}:`, result);
  } catch (e) {
    console.log(`❌ Test ${i + 1}: Error - ${e.message}`);
  }
});

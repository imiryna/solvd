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
  if (typeof par1 === "string" || typeof par2 === "string") return String(par1) + String(par2);

  //hendel of error
  if (arg1 === null || arg2 === null) {
    throw new Error("One of the arguments is null");
  }

  if (typeof par1 !== typeof par2) {
    throw new Error("Invalid data types for addition.");
  }

  // performs the appropriate addition

  //Numbers
  if (typeof par1 === "number" && typeof par2 === "number") return arg1 + par2;

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
  let result = null;

  switch (argTypeOf) {
    case "boolean":
      argTypeOf;
      break;
    case "number":
      result = argTypeOf.toString();
      break;
    case "bigInt":
      result = argTypeOf.toString();
      break;
    default:
      argTypeOf;
  }
}

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
  const arg1 = typeof par1;
  const arg2 = typeof par2;

  //hendel of error
  //  check arg1 === 'object' && arg1 !== null

  // performs the appropriate addition
  if (arg1 === "string" || arg2 === "string") return String(arg1) + String(arg2);

  if (arg1 === "number" && arg2 === "number") return arg1 + arg2;

  if (Array.isArray(arg1) && Array.isArray(arg2)) return [...arg1, ...arg2];

  if (arg1 === "object" && arg2 === "object") return { ...arg1, ...arg2 };
}

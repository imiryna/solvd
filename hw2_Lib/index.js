// import { addValues } from "./hw2_lib";
const { extendStringPrototype, addValues } = require("./hw2_lib");
/* Test cases for the addValues function */
extendStringPrototype();
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

// testCases.forEach(([a, b], i) => {
//   try {
//     const result = addValues(a, b);
//     console.log(`✅ Test ${i + 1}:`, result);
//   } catch (e) {
//     console.log(`❌ Test ${i + 1}: Error - ${e.message}`);
//   }
// });

// test cases for coerceToType
// const testCases = [
//   [42, "string"],
//   [true, "string"],
//   [null, "string"],
//   ["123.45", "number"],
//   [false, "number"],
//   ["true", "boolean"],
//   [1, "boolean"],
// ];

// testCases.forEach(([a, b], i) => {
//   try {
//     const result = coerceToType(a, b);
//     console.log(`✅ Test ${i + 1}:`, result);
//   } catch (e) {
//     console.log(`❌ Test ${i + 1}: Error - ${e.message}`);
//   }
// });
// console.log("dfdg dgdhd {} dfdfd {} qqqq ".format(13, "lololo"));

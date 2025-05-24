/*
file contains functions arithmetic operations on strings
without relying on bigint or arithmetic libraries.
Each function validate its input parameters for possibility
to be cast to number.
*/

String.prototype.plus = function (n) {
  let v2 = Number(n);
  let v1 = Number(this.toString());
  if (isNaN(v1) || isNaN(v2)) {
    // isNaN converts the value to a number before testing it.
    throw new Error("Parameter is not a number!");
  }
  const result = v1 + v2; // actual arithmetic operation
  return result.toString(); // convert result back to string
};

String.prototype.minus = function (n) {
  let v2 = Number(n);
  let v1 = Number(this.toString());
  if (isNaN(v1) || isNaN(v2)) {
    throw new Error("Parameter is not a number!");
  }
  const result = v1 - v2;
  return result.toString();
};

String.prototype.divide = function (n) {
  let v2 = Number(n);
  let v1 = Number(this.toString());
  if (isNaN(v1) || isNaN(v2)) {
    throw new Error("Parameter is not a number!");
  }
  const result = v1 / v2;
  return result.toString();
};

String.prototype.multiply = function (n) {
  let v2 = Number(n);
  let v1 = Number(this.toString());
  if (isNaN(v1) || isNaN(v2)) {
    throw new Error("Parameter is not a number!");
  }
  const result = v1 * v2;
  return result.toString();
};

/* testing of a function

const s2 = "123";
try {
  let s3 = s2.multiply("4");
  console.log(s3);
  console.log(typeof s3);
} catch (e) {
  console.log(e);
}
*/

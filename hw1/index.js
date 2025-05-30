/*
The plus method 
file contains functions arithmetic operations on strings
without relying on bigint or arithmetic libraries.
Each function validate its input parameters for possibility
to be cast to number.

 */

String.prototype.plus = function (n) {
  let value1 = this.toString().split("").reverse();
  let value2 = n.split("").reverse();

  const longest = value1.length < value2.length ? value2.length : value1.length;
  let leftover = 0;
  let result = [];

  for (let i = 0; i < longest; i++) {
    let digit1 = Number(value1[i] || "0");
    let digit2 = Number(value2[i] || "0");

    if (isNaN(digit1) || isNaN(digit2)) {
      throw new Error(`Parameter on position ${longest - i} is not a number!`);
    }

    let sum = digit1 + digit2 + leftover;
    result.push((sum % 10).toString());
    if (sum > 9) {
      sumString = sum.toString();
      leftover = Number(sumString[0]);
    } else {
      leftover = 0;
    }
  }
  return result.reverse().join("");
};

/** The minus method  */

String.prototype.minus = function (n) {
  //assume value1 >= value2
  let value1 = this.toString().split("").reverse();
  let value2 = n.split("").reverse();
  let result = [];
  let borrow = 0;

  for (let i = 0; i < value1.length; i++) {
    let digit1 = Number(value1[i] || "0");
    let digit2 = Number(value2[i] || "0");

    if (isNaN(digit1) || isNaN(digit2)) {
      throw new Error(`Parameter on position ${value1.length - i} is not a number!`);
    }
    let diff = digit1 - digit2 - borrow;
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    result.push(diff.toString());
  }
  return removeLeadingZeros(result.reverse().join(""));
};

// remove leading zeros(we need it to remove zeros thet we place in minus function for shorter number)

function removeLeadingZeros(str) {
  return str.replace(/^0+/, "") || "0";
}

/** The divide method  */

String.prototype.divide = function (div) {
  //local variables
  let divisor = removeLeadingZeros(div);
  let dividend = removeLeadingZeros(this.toString());
  let result = "";
  let divisorLength = divisor.length;

  //check wrong inputs and edge cases

  if (divisor.length === 0 || dividend.length === 0) {
    throw new Error("Input cant be empty.");
  }

  if (!/^\d+$/.test(dividend) || !/^\d+$/.test(divisor)) {
    throw new Error("One of the parameters is not a valid number string.");
  }

  if (divisor === "0") throw new Error("Division by Zero!");

  if (divisor.length > dividend.length) return "0";

  if (divisor === "1") return dividend;
  if (dividend === "0") return "0";

  if (dividend.length <= 4 && divisor.length <= 4) return (result = (Number(dividend) / Number(divisor)).toString());

  // cut partial dividend from dividend starting from length of divisior and
  // then step digit by digit till the end of dividend
  let caret = divisorLength;
  let remainder = 0;
  let res = "";
  let partialDividend = dividend.slice(0, caret - 1);

  while (caret <= dividend.length) {
    // Append one more digit to the partial dividend
    partialDividend += dividend.slice(caret - 1, caret);
    partialDividend = removeLeadingZeros(partialDividend);

    // try ti divide partialDivident by divisor
    [res, remainder] = resultDigit(partialDividend, divisor);
    result += res;
    partialDividend = remainder;

    caret += 1;
  }

  // Return result
  return removeLeadingZeros(result);
};

//compare two integers
function compare(n, k) {
  if (n.length > k.length) return 1;
  if (n.length < k.length) return -1;

  for (let i = 0; i < n.length; i++) {
    if (Number(n[i]) > Number(k[i])) return 1;
    if (Number(n[i]) < Number(k[i])) return -1;
  }
  return 0;
}

// find partial dividend(find smollest number fron first digits thet can be divided by divisior)
// find A - amount of dividers thet can fit into  partial dividend.
// find substraction between partial dividend and A* divisior
function resultDigit(partialDiv, divisor) {
  let count = 0;
  while (compare(partialDiv, divisor) >= 0) {
    partialDiv = partialDiv.minus(divisor);
    count++;
  }
  return [count.toString(), partialDiv];
}

/** The multiply method uses the Karatsuba algorithm */

String.prototype.multiply = function (n) {
  return karatsuba(this.toString(), n);
};

function karatsuba(n1, n2) {
  if (n1.length == 1 || n2.length == 1) {
    return (Number(n1) * Number(n2)).toString();
  }

  // Calculates the size of the numbers.
  const maxLength = n1.length > n2.length ? n1.length : n2.length;
  let halfLength = 0;

  // Check if remainder existed.
  if (maxLength % 2 !== 0) {
    halfLength = maxLength / 2 - 0.5;
  } else {
    halfLength = maxLength / 2;
  }

  // Split the digit sequences in the middle.
  const high1 = n1.slice(0, maxLength - halfLength);
  const low1 = n1.slice(maxLength - halfLength);

  const high2 = n2.slice(0, maxLength - halfLength);
  const low2 = n2.slice(maxLength - halfLength);

  // 3 recursive calls made to numbers approximately half the size.
  const z0 = karatsuba(low1, low2);
  const z1 = karatsuba(low1.plus(high1), low2.plus(high2));
  const z2 = karatsuba(high1, high2);

  //  original formula (z2 × 10 ^ (m2 × 2)) + ((z1 - z2 - z0) × 10 ^ m2) + z0
  const part1 = z2 + pow10(halfLength * 2);
  const part2 = z1.minus(z2).minus(z0) + pow10(halfLength);

  return part1.plus(part2).plus(z0);
}

// exponentiation function
function pow10(x) {
  return "0".repeat(x);
}

/* testing of a function*/

const s2 = "0000123";
try {
  let s3 = s2.divide("0003");
  console.log(s3);
  console.log(typeof s3);
} catch (e) {
  console.log(e);
}

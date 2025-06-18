// Immutability and Pure Functions

/*
1. Implement a pure function called `calculateDiscountedPrice`
that takes an array of products and a discount percentage as arguments. 
The function should return a new array of products with discounted prices based on the given percentage, 
without modifying the original products.*/

// 1. check params if Number used 'convertToNumber'
// 2. throu error
const itemsPrice = [
  { item: "Laptop", price: 1000 },
  { item: "Phone", price: 500 },
  { item: "Tablet", price: 300 },
];

function calculateDiscountedPrice(itemsPrice, discount) {
  // we suppose the itemsPrice is an array of objects with filds: item, price

  const discountedPriceItems = itemsPrice.map((el) => {
    el.price = Number(el.price) - Number(el.price) * (discount / 100);
    return el;
  });

  return discountedPriceItems;
}

console.log(calculateDiscountedPrice(itemsPrice, 10));

/*
Create a pure function called `calculateTotalPrice` that takes an array of products as an argument. 
The function should return the total price of all products, 
without modifying the original array or its items.*/

function calculateTotalPrice(itemsPrice) {
  // Array.reduce() return total price without modify 'itemsPrice'
  const totalPrice = itemsPrice.reduce((accumulator, product) => accumulator + product.price, 0);

  return totalPrice;
}

//  Function Composition and Point-Free Style

/* Implement a function called 'getFullName' that takes a person object with 'firstName' and 'lastName' properties. 
The function should return the person's full name in the format "FirstName LastName". */

const persons = [
  {
    firstName: "Bob",
    lastName: "Json",
  },
  {
    firstName: "Bill",
    lastName: "Smith",
  },
];

const getFullName = (person) => `${person.firstName} ${person.lastName}`;

// Exemple of using Point-free style

console.log(persons.map(getFullName));

/*
Create a function called 'filterUniqueWords' that takes a string of text and returns an array of unique words, 
sorted in alphabetical order, without using explicit loops. 
Use function composition and point-free style.
 */

const st = "qwt reyt ewy twet yw qwt reyt ewy";

// get text return array split by space
const splitStr = (text) => text.split(" ");

// filter out duplecate
const uniqueElem = (arr) => [...new Set(arr)];

// sort them
const alphabeticalOrder = (arr) => arr.toSorted();

// felper function for compose functions
const compose =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

// function composition
const filterUniqueWords = compose(splitStr, uniqueElem, alphabeticalOrder);

console.log("=========================");
console.log(filterUniqueWords(st));

/* 
Implement a function called 'getAverageGrade' that takes an array of student objects, 
each containing a 'name' and 'grades' property. 
The function should return the average grade of all students, without modifying the original array or its items. 
Use function composition and point-free style.
*/

const students = [
  { name: "Alice", grades: [85, 92, 78] },
  { name: "Bob", grades: [90, 88, 95] },
  { name: "Charlie", grades: [70, 75, 80] },
  { name: "Diana", grades: [95, 98, 94] },
  { name: "Ethan", grades: [60, 65, 70] },
];

const allGrades = (arr) => arr.reduce((acc, el) => [...acc, ...el.grades], []);

const average = (arr) => arr.reduce((acc, el) => acc + el, 0) / arr.length;

const getAverageGrade = compose(allGrades, average);

console.log(getAverageGrade(students));

//  Closures and Higher-Order Functions

/*
Create a function called 'createCounter' that returns a closure. 
The closure should be a counter function that increments the count on each call and returns the updated count. 
Each closure should have its own independent count. 
*/
console.log("==========counter closures ===============");
function createCounter() {
  let counter = 0;

  function counterIncrement() {
    counter++;
    console.log(counter);
    return counter;
  }

  return counterIncrement;
}

const counterN1 = createCounter();
const counterN2 = createCounter();

counterN1();
counterN1();
counterN2();

/* 
Implement a higher-order function called 'repeatFunction' that takes a function and a number as arguments. 
The function should return a new function that invokes the original function multiple times 
based on the provided number. 
If the number is negative, the new function should invoke the original function indefinitely until stopped.
*/

const repeatFunction = (fn, times) => {
  return function recur(x) {
    if (times === 1) return fn(x);
    return fn(repeatFunction(fn, times - 1)(x));
  };
};

const w = (x) => x * x;
const repeatFn = repeatFunction(w, 3);

console.log(repeatFn(3));

//    Recursion and Tail Call Optimization

/*
Implement a recursive function called calculateFactorial that calculates the factorial of a given number. 
Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.
*/

// wrap function to reduce amount of input variables
// end user no nothing about acc variable
function calculateFactorial(num) {
  // input the num for factorial and acc for storing result for each iteration
  function factorialTco(num, acc) {
    if (num == 0) return acc;

    return factorialTco(num - 1, acc * num);
  }

  return factorialTco(num, 1);
}

console.log("=== Factorial TCO =======");
console.log(calculateFactorial(10));
console.log("=========================");

/*
Create a recursive function called power that takes a base and an exponent as arguments. 
The function should calculate the power of the base to the exponent using recursion.
*/
function power(base, exponent) {
  function recPower(base, exponent, acc) {
    if (exponent === 0) return acc;
    return recPower(base, exponent - 1, acc * base);
  }
  return recPower(base, exponent, 1);
}
console.log(power(2, 3));

//   Lazy Evaluation and Generators (do not use yield)

/*
Implement a lazy evaluation function called lazyMap that takes an array and a mapping function. 
The function should return a lazy generator that applies the mapping function 
to each element of the array one at a time.
*/

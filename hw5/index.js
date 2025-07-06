// ====== Advanced Array Filtering ======

function customFilterUnique(value, fn) {
  const result = [];

  for (const el of value) {
    //check el on unique
    if (fn(el) && !result.includes(el)) {
      result.push(el);
    }
  }
  return result;
}

function customFilterUnique2(arr, getKey) {
  const seen = new Set();

  return arr.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
const numbers = [1, 2, 3, 4, 4, 1, 3, 5];
const people = [
  {
    name: "igor",
    age: 37,
  },
  {
    name: "Iryna",
    age: 42,
  },
  {
    name: "Iryna",
    age: 345,
  },
];
// const arrayFiltered = (el) => el >= 3;
const arrayFiltered = (el) => el.age >= 38;

const a = customFilterUnique(numbers, arrayFiltered);
const c = customFilterUnique(people, arrayFiltered);
console.log(a);
console.log(JSON.stringify(customFilterUnique2(people, (person) => `${person.name}-${person.age}`)));
// console.log(numbers.filter((el) => el >= 3));

// ======= Array Chunking ========

/*
Create a function called chunkArray that takes an array and a chunk size as arguments. 
The chunkArray function should divide the array into smaller arrays, 
each containing elements of the specified chunk size. The function should return an array of arrays.
*/
console.log("============================");
function chunkArray(arr, x) {
  let result = [];

  for (let i = 0; i < arr.length; i += x) {
    result.push(arr.slice(i, i + x));
  }

  return result;
}
const x = 2;
let aa = chunkArray(numbers, x);
console.log(JSON.stringify(aa));

//Optimize the chunkArray function to minimize memory usage while chunking the array.

// array.splice() allows to avoid holding all chunks in memory

function chunkArraySplice(arr, x) {
  // here the only cons of an approach - we hold a copy
  // an array in memory, to avoid origin array destruction

  const copy = [...arr];
  const result = [];

  while (copy.length > 0) {
    result.push(copy.splice(0, x));
  }

  return result;
}

console.log("===== use splice ====");
console.log(JSON.stringify(chunkArraySplice(numbers, 3)));

//  we avoids holding all chunks in memory at once cause we use generator

function* chunkArrayOptimize(arr, x) {
  for (let i = 0; i < arr.length; i += x) {
    yield arr.slice(i, i + x);
  }
}
console.log("===== use Generators ====");
for (const x of chunkArrayOptimize(numbers, 3)) {
  console.log(x);
}

//============ Array Shuffling ============

const cards = ["Q", 1, 2, 3, 4, 5, "S", "R", "T"];
function customShuffle(arg) {
  const a = [...arg];
  return a.sort(() => Math.random() - 0.5);
}

console.log("====== Array shuffling =======");
console.log(customShuffle(cards));
console.log(customShuffle(cards));
console.log(customShuffle(cards));

// ===== Fisher-Yates algorithm =======

function arrayShuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
}

console.log("====== Fisher-Yates =====");
console.log(`The origin arrey ${cards}`);

// testing seweral time

for (let i = 0; i < 4; i++) {
  const s = arrayShuffle(cards);
  console.log(s);
}

// ====== Array Intersection ======

const arrA = [1, 3, 4, 5];
const arrB = [1, 2, 5, 6, 7];

function getArrayIntersection(x, y) {
  const intersection = x.filter((el) => y.includes(el));
  return intersection;
}
console.log("=======Intersection ======");
console.log(getArrayIntersection(arrA, arrB));

// ====== Array Union ======

function getArrayUnion(a, b) {
  const arrWithoutDuplications = [...new Set([...a, ...b])];
  return arrWithoutDuplications;
}
console.log("======= Union ======");
console.log(getArrayUnion(arrA, arrB));

// ===== Array Performance Analysis =====

function measureArrayPerformance(arr, fn) {
  const start = performance.now();

  const result = fn(arr);

  const end = performance.now();

  return {
    time: end.toFixed(4) - start.toFixed(4),
  };
}

const d = measureArrayPerformance(cards, arrayShuffle);
console.log(JSON.stringify(d));
const test = [42, 87, 13, 56, 95, 61, 7, 19, 83, 23, 100, 36, 78, 11, 91, 50, 35, 3, 67, 71, 99, 26, 89, 8, 39, 59, 73, 21, 16, 18, 97, 66, 84, 63, 47, 53, 41, 6, 25, 58, 2, 32, 94, 1, 40, 22, 75, 70, 20, 15, 10, 43, 85, 24, 45, 68, 5, 14, 46, 12, 81, 28, 4, 37, 90, 17, 64, 38, 34, 30, 92, 44, 33, 9, 29, 80, 76, 27, 62, 60, 55, 79, 93, 31, 98, 86, 49, 65, 57, 100, 48, 51, 96, 77, 74, 52, 69, 88, 72, 54, 82, 35, 83, 59, 43, 90, 27, 2, 48, 67, 95, 76, 31, 21, 5, 33, 66, 18, 14, 87, 58, 63, 70, 28, 7, 80, 44, 40, 36, 16, 25, 4, 55, 42, 19, 1, 8, 23, 38, 99, 60, 29, 91, 30, 11, 73, 3, 53, 6, 32, 46, 17, 39, 10, 22, 61, 9, 24, 26, 56, 12, 13, 20, 74, 64, 47, 84, 41, 85, 100, 50, 69, 82, 86, 97, 71, 45, 68, 15, 34, 57, 49, 37, 78, 92, 94, 93, 98, 65, 51, 62, 77, 96, 89, 88, 72, 75, 79];
console.log("============");
const ffMap = measureArrayPerformance(test, (arr) => arr.map((el) => el + 1));
console.log(JSON.stringify(ffMap));
const ffFilter = measureArrayPerformance(test, (arr) => arr.filter((el) => el % 2 === 0));
console.log(JSON.stringify(ffFilter));
const ffReduce = measureArrayPerformance(test, (arr) => arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
console.log(JSON.stringify(ffReduce));

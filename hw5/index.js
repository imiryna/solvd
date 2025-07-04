// ====== Advanced Array Filtering ======

function customFilterUnique(value, fn) {
  const arr = [];
  console.log(arr);
  //   const result = [];

  for (const el of value) {
    // const element = fn(el);

    //check el on unique
    // if (!arr.has(el)) {
    //   arr.add(el);
    // }
    if (fn(el)) arr.push(el);
  }
  return arr;
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
];
// const arrayFiltered = (el) => el >= 3;
const arrayFiltered = (el) => el.age >= 38;

const a = customFilterUnique(people, arrayFiltered);
// console.log(a);
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

// array.splice() allows to avoid holding all chunks in memory at once

function chunkArraySplice(arr, x) {
  const copy = [...arr]; // but we're still hold copy array in memory
  const result = [];

  while (copy.length > 0) {
    result.push(copy.splice(0, x)); // removes from arr and avoids copying
  }

  return result;
}

console.log("===== use splice ====");
console.log(JSON.stringify(chunkArraySplice(numbers, 3)));
//  we avoids holding all chunks in memory at once

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

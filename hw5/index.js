// ====== Advanced Array Filtering ======

function customFilterUnique(value, fn) {
  const arr = new Set();
  console.log(arr);
  //   const result = [];

  for (const el of value) {
    const element = fn(el);

    //check el on unique
    if (!arr.has(element)) {
      arr.add(element);
    }
    console.log(arr);
  }
  return arr;
}
const numbers = [1, 2, 3, 4, 4];
const arrayFiltered = (numbers, (item) => item);
customFilterUnique(numbers);

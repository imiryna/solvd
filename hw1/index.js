//
//Create a function doubleArray(arr) that returns a new array where every number is doubled.
const arr = [1, 2, 3, 4];

function doubleArray(a) {
  let newAr = [];

  for (let i = 0; i < a.length; i++) {
    newAr.push(a[i] * 2);
  }
  return newAr;
}
const w = doubleArray(arr);
console.log(w);

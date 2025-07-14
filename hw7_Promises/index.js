//====== promiseAll Function ====

const { rejects } = require("assert");
const { resolve } = require("path");

const promiseAll = (value, delay, shouldReject = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //setTimeout to simulate asynchronous operation
      if (shouldReject) {
        reject(value);
      } else {
        resolve(value);
      }
    }, delay);
  });
};
// const promises = [promiseAll(1, 500, true), promiseAll(2, 1000), promiseAll(3, 1500)];
const promises = [promiseAll(1, 500), promiseAll(2, 200), promiseAll(3, 1500)];

Promise.all(promises)
  .then((results) => {
    console.log("All promises resolved:", results); // Expected: [1, 2, 3]
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  });

// ======== promiseAllSettled Function =========

function promiseAllSettled(value) {
  const allSettled = value.map((res) =>
    Promise.resolve(res)
      .then((value) => ({ status: "fulfilled", value: value }))
      .catch((error) => ({ status: "rejected", reason: error }))
  );
  return Promise.all(allSettled);
}

const promisess = [Promise.resolve(1), Promise.reject("Error occurred"), Promise.resolve(3)];

promiseAllSettled(promisess).then((results) => {
  console.log("All promises settled:", results);
  results.forEach((result, index) => {
    console.log(`Promise ${index + 1}:`, result);
  });
  // Expected: [{ status: 'fulfilled', value: 1 },
  //            { status: 'rejected', reason: 'Error occurred' },
  //            { status: 'fulfilled', value: 3 }]
});

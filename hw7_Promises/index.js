//====== promiseAll Function ========

function promiseAll(value) {
  return Promise.all(value.map((res) => Promise.resolve(res)));
}

const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

promiseAll(promises)
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
    console.log(index + 1, result);
  });
  // Expected: [{ status: 'fulfilled', value: 1 },
  //            { status: 'rejected', reason: 'Error occurred' },
  //            { status: 'fulfilled', value: 3 }]
});

const arr = [];

const arr2 = new Array();

//========= Chaining of Promises as a Separate Function =======

function asyncFunction1() {
  return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
  return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
  return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

function chainPromises(functionsArray) {
  return functionsArray.reduce((acc, curr) => {
    return acc.then(curr);
  }, Promise.resolve());
}

chainPromises(functionsArray)
  .then((result) => {
    console.log("Chained promise result:", result);
    // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
  })
  .catch((error) => {
    console.error("Chained promise error:", error);
  });

// ======= promisify Function ======

function callbackStyleFunction(value, callback) {
  setTimeout(() => {
    if (value > 0) {
      callback(null, value * 2);
    } else {
      callback("Invalid value", null);
    }
  }, 1000);
}

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

const promisedFunction = promisify(callbackStyleFunction);

promisedFunction(8)
  .then((result) => {
    console.log("Promised function result:", result); // Expected: 6
  })
  .catch((error) => {
    console.error("Promised function error:", error);
  });

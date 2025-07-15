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

/*
1. Сортування обміном
2. Знайти перше входженння даного елемента в масив (повернути індекс, якщо такого немає то -1)
3. Знайти останнє входження
4. Перевірити рядок на паліндром
5*. Знайти найдовшу підрядок символів що не повторяються в рядку (тобто нема двох однакових поруч)
*/
const arr = [];

const arr2 = new Array();

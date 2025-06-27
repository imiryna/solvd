// ============  Object Property Manipulation  ===========

//1. Create an object called person with the properties and values
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
};

Object.keys(person).forEach((key) => {
  Object.defineProperty(person, key, {
    writable: false,
    enumerable: true,
  });
});

// Implement a method updateInfo
person.updateInfo = function (updates) {
  // list of my customs properties, and check properties
  const definedProps = Object.keys(obj).filter((key) => {
    const descript = Object.getOwnPropertyDescriptor(obj, key);
    if (descript !== undefined) return key;
  });

  for (const [key, value] of Object.entries(updates)) {
    if (key in definedProps) {
      // in a case, if we have nested object
      if (typeof value === "object" && !Array.isArray(value) && value !== null) {
        data[key] = { ...definedProps[key], ...value };
      } else {
        data[key] = value;
      }
    }
  }
};

// Create a new property called 'address' non-enumerable and non-configurable
Object.defineProperty(person, "address", {
  value: {},
  writable: false,
  enumerable: false,
  configurable: false,
});

console.log("=========== object Manipulation ===========");
console.log(person);
console.log(person.firstName);
person.firstName = "Bob"; // Attempt to change value will be ignored
console.log(person.firstName);
console.log(person.address);

// =============   Object Property Enumeration and Deletion   ==============

const item = {
  name: "Laptop",
  price: 1000,
  quantity: 5,
};

// to make the price and quantity properties non-enumerable and non-writable.
Object.keys(item).forEach((key) => {
  if (key === "price" || key === "quantity") {
    Object.defineProperty(item, key, {
      writable: false,
      enumerable: false,
    });
  }
});

// function  'getTotalPrice' that  returns the total price.

function getTotalPrice(product) {
  // to accesses to properties corectly using the Object.getOwnPropertyDescriptor method.
  const priceDescriptor = Object.getOwnPropertyDescriptor(product, "price");
  const quantityDescriptor = Object.getOwnPropertyDescriptor(product, "quantity");

  if (priceDescriptor === undefined || quantityDescriptor === undefined) {
    throw new Error("The property is undefined");
  }

  const price = priceDescriptor.value;
  const quantity = quantityDescriptor.value;

  if (typeof price !== "number" || typeof quantity !== "number") {
    throw new Error("Incorrect data type");
  }

  return price * quantity;
}

function deleteNonConfigurable(obj, propertyKey) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, propertyKey);

  if (!descriptor) {
    throw new Error(`Property "${propertyKey}" does't exist on the object.`);
  }

  if (!descriptor.configurable) {
    throw new Error(`Cannot delete property "${propertyKey}" because it is non-configurable.`);
  }

  delete obj[propertyKey];
}

console.log("=========== object Enumeration and Deletion ===========");

console.log(item.price);
console.log(item.quantity);
console.log(`we can see just '${Object.keys(item)}' properti`);
item.price = 20;
console.log(item.price);

console.log(getTotalPrice(item));

// ============  Object Property Getters and Setters  ===========

const bankAccountTemplate = {
  _balance: 1000,

  get formattedBalance() {
    return `$${this._balance}`;
  },

  get balance() {
    // for getting balance as it is, for arifmetics
    return this._balance;
  },

  set balance(value) {
    if (typeof value !== "number" || value < 0) {
      throw new Error("Balance must be a non-negative number.");
    }
    this._balance = value;
  },

  transfer(accountTo, amount) {
    if (this.balance < amount) throw new Error("Negative balance warning");

    // this.balance = this._balance - amount;
    this.balance -= amount;
    accountTo.balance += amount;
  },
};

const bankAccount1 = Object.create(bankAccountTemplate);
const bankAccount2 = Object.create(bankAccountTemplate);

console.log("=========== Object Property Getters and Setters ===========");
console.log(bankAccount1.formattedBalance);
console.log(bankAccount2.formattedBalance);

bankAccount1.transfer(bankAccount2, 500);

console.log(bankAccount1.formattedBalance);
console.log(bankAccount2.formattedBalance);

// =============  Advanced Property Descriptors  ================
const personTest = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
  address: {
    street: "6-AV",
    apart: 6,
  },
  hobbies: ["reading", "swimming"],
};

function createImmutableObject(obj) {
  const objNew = { ...obj };

  Object.keys(objNew).forEach((key) => {
    if (typeof objNew[key] === "object" && !Array.isArray(objNew[key]) && Object.keys(objNew[key]).length !== 0) {
      objNew[key] = createImmutableObject(objNew[key]);
    }

    if (Array.isArray(objNew[key])) {
      objNew[key] = objNew[key].map((element) => {
        if (typeof element === "object" && Object.keys(element).length !== 0) {
          element = createImmutableObject(element);
        }
        return element;
      });
    }
    Object.defineProperty(objNew, key, {
      writable: false,
      enumerable: true,
    });
  });
  return objNew;
}
console.log("=========== Advanced Property Descriptors ===========");

personTest.age = 20;

console.log(personTest.age);
console.log(JSON.stringify(personTest));
const newPerson = createImmutableObject(personTest);
// const newPerson = { ...personTest };
newPerson.age = 666;
newPerson.address.street = "Baker";
newPerson.hobbies[0] = "hjgjfjf";
console.log(JSON.stringify(newPerson));

// =============  Object Observation  ============

function observeObject(obj, fn) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      fn(key, target[key]);
      return Reflect.get(target, key, receiver);
    },

    set(target, key, value, receiver) {
      fn(key, value);
      return Reflect.set(target, key, value, receiver);
    },
  });
}

const showLogs = (key, value) => {
  console.log(`Property "${key}" was accessed or changed. Value: ${value}`);
};

console.log("=========== Object Observation ===========");
const proxyPerson = observeObject(person, showLogs);
console.log(proxyPerson.firstName);
proxyPerson.firstName = "Baka";
console.log(proxyPerson.firstName);

// ========== Object Deep Cloning  =============

function deepCloneObject(value, cache = new WeakMap()) {
  // check if we already have a object in cache
  // that mean we have circular ref and we already in it
  if (cache.has(value)) return cache.get(value);

  // primitive type and function return as it is
  if (typeof value !== "object" || typeof value === "function") {
    return value;
  }

  // Array - map through elements of array with our function
  if (Array.isArray(value)) return value.map((el) => deepCloneObject(el, cache));

  if (typeof value === "object") {
    // make clone of object
    const clone = {};
    // store it in cache as sample
    cache.set(value, clone);

    Object.entries(value).forEach(function ([key, val]) {
      clone[key] = deepCloneObject(val, cache);
    });
    return clone;
  }
}

const books = {
  "Deep work": "Cal Newport",
  "Atomic Habits": "James Clear",
  a: {
    b: 1,
    c: 2,
  },
};

console.log("=========== Object Deep Cloning ===========");

let cloneBook = deepCloneObject(books);
books["Atomic Habits"] = "Some another book";
console.log(books["Atomic Habits"]);
console.log(cloneBook["Atomic Habits"]);

console.log(books.a);
console.log(cloneBook.a);

//============== Object Property Validation ===============

function validateObject(user, schema) {
  //get keys
  let userKeys = Object.keys(user);
  const schemaKeys = Object.keys(schema);

  for (const key of schemaKeys) {
    const field = key;
    //check whether user includes key
    //if true - remove it from userKeys
    if (userKeys.includes(field)) {
      userKeys = userKeys.filter((key) => key !== field);

      if (typeof schema[key] === "object") {
        try {
          validateObject(user[key], schema[key]);
        } catch (e) {
          throw new Error(`<${key}>.${e.message}`);
        }
      }

      // check type of a field
      if (typeof user[key] !== "object" && typeof user[key] !== schema[key]) {
        throw new Error(`<${key}> property should be a <${schema[key]}> type`);
      }
    } else {
      throw new Error(`<${field}> property not presented in object`);
    }
  }
  if (userKeys.length !== 0) {
    throw new Error(`${userKeys.join(", ")} properties are extra and not presented in schema`);
  }

  return true;
}

const user = {
  name: "Bob",
  age: 30,
  email: "qwe123@test.com",
  pet: {
    name: "cat",
    age: 1,
  },
};

const userSchema = {
  name: "string",
  age: "number",
  email: "string",
  pet: {
    name: "string",
    age: "string",
  },
};

console.log("============= Property Validation ========== ");

try {
  console.log(validateObject(user, userSchema));
} catch (e) {
  console.error(e.message);
}

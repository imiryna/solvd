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

console.log("=========== Advanced Property Descriptors ===========");

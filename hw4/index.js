/*
1. Create an object called person with the following properties and values:
firstName: "John"
lastName: "Doe"
age: 30
email: "john.doe@example.com"
*/

/* 2. Implement a method called updateInfo on the person object that takes a new info object as an argument. 
The info object should contain updated values for any of the properties (e.g., { firstName: "Jane", age: 32 }). 
Ensure that this method adheres to the read-only property descriptor set earlier.
*/

/*
Create a new property called address on the person object with an initial value of an empty object. 
Make this property non-enumerable and non-configurable.
*/

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
  // list of my castoms propertis, and check propertys
  const definedProps = Object.keys(obj).filter((key) => {
    const descript = Object.getOwnPropertyDescriptor(obj, key);
    return descript && descript.writable === false;
  });

  for (const [key, value] of Object.entries(updates)) {
    if (key in data) {
      // Merge for nested objects (like address)
      if (typeof value === "object" && !Array.isArray(value) && value !== null) {
        data[key] = { ...data[key], ...value };
      } else {
        data[key] = value;
      }
    }
  }
};

// Create a new property called 'address'
Object.defineProperty(person, "address", {
  writable: false,
  enumerable: false,
  configurable: false,
});

console.log("=========== creating object person ===========");
console.log(person);
console.log(person.firstName);
person.firstName = "Bob"; // Attempt to change value will be ignored
console.log(person.firstName);
console.log(person.address);

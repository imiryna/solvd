// ==== Hash Function ====

const { notStrictEqual } = require("assert");

// create class HashTable where the key/value pairs will be stored inside the table property,
// we assume that HashTable has fixed amount of cells
// time complexity of basic operations - set, get - O(1)
class HashTable {
  constructor() {
    this.table = new Array(120);
    this.size = 0;
  }

  //For creating hash function we can use charCodeAt() method,
  // that returns a Unicode character set code unit

  hash(str) {
    let hash = 0;

    if (str.length === 0) return hash; // if the 'hash' is empty

    for (let i = 0; i < str.length; i++) {
      //let char = str.charCodeAt(i);

      // use pseudo-hash for efficient calculation.

      // mimic the polynomial rolling hash (wiki)
      // code of symbol plus previous hash multiplied on 31 (primal number)
      // and & 0xfffffff exsure that result will be in integer range
      hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
    }
    return hash % this.table.length; // this division ensure that number will be not greater that array length
  }

  // Create set method to set the key/value pair in the HashTable

  set(key, value) {
    const indexHash = this.hash(key); // call the hash() method to get the index value.

    // to implement handle index Collision we check table[index]
    if (this.table[indexHash]) {
      // Look to the table[index] and loop over the array values.
      for (let i = 0; i < this.table[indexHash].length; i++) {
        // Find the key/value pair in the chain
        if (this.table[indexHash][i][0] === key) {
          this.table[indexHash][i][1] = value;
          return;
        }
      }
      // not found, push a new key/value pair
      this.table[indexHash].push([key, value]);
    } else {
      this.table[indexHash] = [];
      this.table[indexHash].push([key, value]); // The key-value pair is assigned to the table
    }
    this.size++;
  }

  //Use hash() method for getting key's index for quickly look up an element
  get(key) {
    const index = this.hash(key);

    if (this.table[index]) {
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[index][i][0] === key) {
          return this.table[index][i][1];
        }
      }
    }
    return undefined;
  }

  remove(key) {
    const index = this.hash(key);

    // Check if the table[index] has a value and the tabl.length is greater than 0.
    // for update remove() we loop over the second-level array and remove the array with the right key
    //  value using the splice() method
    if (this.table[index] && this.table.length) {
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[index][i][0] === key) {
          this.table[index].splice(i, 1);
          this.size--;
          return true;
        }
      }
    } else {
      return false;
    }
  }

  // add a display() method to display all key/value pairs stored in the HashTable

  display() {
    this.table.forEach((values, index) => {
      const chainedValues = values.map(([key, value]) => `[ ${key}: ${value} ]`);
      console.log(`${index}: ${chainedValues}`);
    });
  }

  resize() {
    const extesdArrLength = this.table.length * 2;

    const newArr = new Array(extesdArrLength); //Creates a new array with newCapacity elements.

    // Storing old table for copy
    const oldTable = this.table;

    // Updating the table to the new one
    this.table = newArr;

    // Iterate through old table
    for (let i = 0; i < oldTable.length; i++) {
      const bucket = oldTable[i];
      if (bucket) {
        bucket.forEach((record) => {
          console.log(`${record[0]} => ${record[1]}`);
          this.set(record[0], record[1]);
        });
      }
    }
  }
}

const hf = new HashTable();

hf.set("Canada", 300);

hf.set("France", 100);

hf.set("Spain", 110);

hf.set("o", 666);

console.log(hf.get("Canada"));
console.log(hf.get("France"));
console.log(hf.get("Spain"));

console.log(hf.remove("Spain"));

hf.set("Spain", 110);
console.log("===display===");
hf.display();
console.log("===resize===");
hf.resize();
console.log("====new_display===");
hf.display();
console.log("1");

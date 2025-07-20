class Book {
  constructor(title, author, isbn, price, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }
}

const book = new Book("Deeply work", "Bob Bill", "82123564646", 50, true);
const book1 = new Book("Some Old Book", "Unknown", "9876543210", 9.99, true);

console.log(book);

class User {
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
  }
}

const user = new User("Bob Smith", "qwe@test.com", 1);

console.log(user);

class Cart {
  constructor(user) {
    this.user = user;
    this.items = [];
    this.totalPrice = 0;
  }

  addBook(book) {
    //we suppose that we will check book availability dispite of FE check
    if (!book.availability) return console.log(`Sorry, "${book.title}" is not available.`);

    if (!this.items.includes(book)) {
      this.items.push(book);
      this.totalPrice += book.price.toFixed(2);
    } else {
      console.log(` "${book.title}" already on the bucket.`);
    }
  }

  removeBook(book) {
    this.items = this.items.filter((el) => el.isbn !== book.isbn);
    this.totalPrice -= book.price.toFixed(2);
  }

  getTotalPrice() {
    return this.totalPrice;
  }
}
const cart = new Cart(user);
console.log("======  Cart==========");
console.log(JSON.stringify(cart));

cart.addBook(book);
cart.addBook(book1);
console.log(JSON.stringify(cart));
// cart.removeBook(book);
// console.log(JSON.stringify(cart));

console.log(JSON.stringify(cart));

class Order {
  constructor(user, book) {
    this.user = user;
    this.book = book;
    this.orderDate = new Date();
    this.orderId = 0;
    this.totalPrice = 0;
  }
}

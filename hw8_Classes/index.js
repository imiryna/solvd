/**
 * In this file declared Book, User, Cart and Order classes.
 *  - User (the one who order the books)
 *  - Book (that will be added to Cart and proceed to Order)
 *  - Cart (collection of books that User what to order)
 *  - Order (finalized Cart with data, orderId, etc)
 */

// according to the tech spec Book has next properties, no methods
class Book {
  constructor(title, author, isbn, price, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }
}

// ==== Inheritence (Polymorphism using) ====
// Inherited from Book. Example for demonstating following polymorphysm
// <genre> and <setting> properties added for specification of Fiction Book
class FictionBook extends Book {
  constructor(title, author, isbn, price, availability, genre, setting) {
    super(title, author, isbn, price, availability);
    this.genre = genre;
    this.setting = setting;
  }
}

// Inherited from Book. Example for demonstating following polymorphysm
// <subject> property added for specification of Fiction Book
class NonFictionBook extends Book {
  constructor(title, author, isbn, price, availability, subject) {
    super(title, author, isbn, price, availability);
    this.subject = subject;
  }
}

// instances of all kinds of Book class
const book = new Book("Deeply work", "Bob Bill", "82123564646", 50, true);
const book1 = new FictionBook("Some Book", "J.J.Pack", "9876543210", 9.99, true, "horror", "fantasy");
const book2 = new Book("Some Old Book", "Mike Brams", "23423562436", 15.45, true);
const book3 = new NonFictionBook("Some New Book", "Killian Huge", "6545633455", 21.2, true, "Math");

// console.log(book);
// console.log(book1);
// console.log(book2);
// console.log(book3);

// User class. According to tech spec
class User {
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
  }

  // example of method. Print the full information about User
  businessCard() {
    // console.log(`Name: ${this.name} \nEmail: ${this.email}`);
  }
}

const bob = new User("Bob Smith", "bob@test.com", 1);
const jack = new User("Jack Black", "jack@test.com", 2);
// example of method call
bob.businessCard();
jack.businessCard();

// ======= Cart =========
// Cart class. According to tech spec
// user input in contructor - User for whom Cart is created.
// items - collection of books, chosen by User
// totalPrice - automatically calculated total price of books
// (increase when add, decrease when remove)
class Cart {
  // private property, denying direct modification
  #totalPrice;
  constructor(user) {
    this.user = user;
    this.items = [];
    this.#totalPrice = 0;
  }

  // add one given book to cart
  // check if book is available and if it wasn't added before
  // suggest that we can't add same book twice
  // increase totalPrice on book.price value
  addBook(book) {
    //we suppose that we will check book availability dispite of FE check
    if (!book.availability) return console.log(`Sorry, "${book.title}" is not available.`);

    if (!this.items.includes(book)) {
      this.items.push(book);
      this.#totalPrice += book.price;
    } else {
      console.log(` "${book.title}" already on the bucket.`);
    }
  }

  // remove book from Cart.
  // decrease totalPrice on book.price value
  // suppose that given book really is in the cart
  removeBook(book) {
    this.items = this.items.filter((el) => el.isbn !== book.isbn);
    this.#totalPrice -= book.price;
  }

  // kinda getter for totalPrice property
  getTotalPrice() {
    return this.#totalPrice;
  }
}

// instance of Cart class for the User <bob>
const cart = new Cart(bob);
// print initial state of the cart - empty
// console.log("======  Cart empty ==========");
// console.log(JSON.stringify(cart, null, 2));
// console.log(`TotalPrice: ${cart.getTotalPrice()}`);

// add several books
cart.addBook(book);
cart.addBook(book1);
cart.addBook(book2);

// show that books are in the cart
// console.log("======  Cart 3 books ==========");
// console.log(JSON.stringify(cart, null, 2));
// console.log(`TotalPrice: ${cart.getTotalPrice()}`);

// remove one of the books from the cart
cart.removeBook(book1);

// show that it was removed from the cart
// console.log("======  Cart 2 books ==========");
// console.log(JSON.stringify(cart, null, 2));
// console.log(`TotalPrice: ${cart.getTotalPrice()}`);

// ======= Order ====
// Order class. Take instance of the Cart Class as input value.
// take from cart instance User data and list of books from cart,
// and totalPrice of cart
// generate orderDate
// generate orderId
class Order {
  constructor(cartInstanse) {
    this.user = cartInstanse.user;
    this.books = cartInstanse.items;
    this.orderDate = new Date();
    this.orderId = this.generateOrderId();
    this.totalPrice = cartInstanse.totalPrice;
  }

  // method for generating orderId based on date and random numbers
  generateOrderId() {
    return `Order #${Math.ceil(Math.random() * Date.now())}`;
  }

  // compose Order Summary as object.
  getOrderSummary() {
    return {
      orderId: this.orderId,
      user: this.user.name,
      email: this.user.email,
      total: this.totalPrice,
      //   books: this.books,
      books: this.books.map((book) => book.title),
      date: this.orderDate.toLocaleString(),
    };
  }
}

// instance of the order based on Bob's cart
const order = new Order(cart);
// console.log("====== Order ==========");
// print the order summary
// console.log(JSON.stringify(order.getOrderSummary(), null, 2));

// ==== Bonus section =====

// implement additional functionaliti for searching books on the stor by query
// searchBooks we need to stor them somewhere persistently(foe example DB)
// and implementing on search on DB level

function searchBooks(value, books) {
  const search = value.toLowerCase();
  return books.filter((book) => book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search));
}

const books = [book, book1, book2, book3];
// console.log("========== searchBooks ==============");
// console.log(JSON.stringify(searchBooks("mike", books), null, 2));

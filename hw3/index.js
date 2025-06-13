// Immutability and Pure Functions

/*
1. Implement a pure function called `calculateDiscountedPrice`
that takes an array of products and a discount percentage as arguments. 
The function should return a new array of products with discounted prices based on the given percentage, 
without modifying the original products.*/

// 1. check params if Number used 'convertToNumber'
// 2. throu error
const itemsPrice = [
  { item: "rtrtr", price: 29 },
  { item: "rfgf", price: 24 },
];
function calculateDiscountedPrice(itemsPrice, discount) {
  // we suppose the itemsPrice is an array of objects with filds: item, price

  const discountedPriceItems = itemsPrice.map((el) => {
    el.price = Number(el.price) - Number(el.price) * (discount / 100);
    return el;
  });

  return discountedPriceItems;
}

/*
Create a pure function called `calculateTotalPrice` that takes an array of products as an argument. 
The function should return the total price of all products, 
without modifying the original array or its items.*/

function calculateTotalPrice() {}
console.log(calculateDiscountedPrice(itemsPrice, 10));

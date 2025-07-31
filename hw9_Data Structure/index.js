// ======= Implementation of Stack  =======

class Stack {
  constructor() {
    this.items = [];
  }

  // isEmpty operation allows to avoid "Stack Underflow" error during performing a pop or peek operation
  // and check if the stack is full before performing a push operation,
  //  as well to avoid 'Stack Overflow'
  isEmpty() {
    return this.items.length === 0;
  }

  // Push operation adds an element to the top of the stack.
  push(element) {
    this.items.push(element);
  }

  // Pop operation removes and returns the top element from the stack.
  pop() {
    // Check if the stack is empty before performing pop
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  // Peek operation returns the top element without removing it.
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }
}

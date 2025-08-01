// ======= Implementation of Stack  =======

class Stack {
  constructor() {
    this.items = [];
  }

  // isEmpty operation allows to avoid "Stack Underflow" error during performing a pop or peek operation
  // and check if the stack is full before performing a push operation,
  //  as well to avoid 'Stack Overflow'
  // Time Complexity: O(1).
  isEmpty() {
    return this.items.length === 0;
  }

  // Push operation adds an element to the top of the stack.
  // Time Complexity: O(1).
  push(element) {
    this.items.push(element);
  }

  // Pop operation removes and returns the top element from the stack.
  //Time Complexity: O(1).
  pop() {
    // Check if the stack is empty before performing pop
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items.pop();
  }

  // Peek operation returns the top element without removing it.
  // Time Complexity: O(1).
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }
  // Time Complexity: O(n).
  // todo question: Can we show inner stracture(array) or we should pop elements one by one?
  itemsShow() {
    console.log(this.items);
  }
}

const stack = new Stack();

stack.push(2);
stack.push(3);
stack.push(5);

console.log(stack.peek());
console.log(stack.pop());
console.log(stack.isEmpty());
stack.itemsShow();

// ==== class for a queue ===

//class Node is one element of a Queue for storing data.

class Node {
  constructor(data) {
    this.data = data;
    // 'next' is a link to next Node in a queue. It can be Node or null type
    this.next = null;
  }
}

// class Queue ia a class for storing Nodes in a queue
// Queue has 'head' - first element of a queue, 'tail' - latest element of a queue,
// 'size' - amount of elements in a queue
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Add element to queue. Two cases
  // 1. Queue is empty, first element becomes head and tail
  // 2. Queue has already at least one element. newNode become next for current tail and than replace tail itself
  // Time Complexity: O(1).
  enqueue(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.size++;
  }

  // Take first element from the queue.
  // if queue is empty - return <null>
  // next in a queue become head of a queue
  // if we took last element - reset head and tail to null
  // Time Complexity: O(1).
  dequeue() {
    if (!this.head) return null;
    const removed = this.head;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.size--;
    return removed.data;
  }

  // show first element without taking it from queue.
  // check if it exists
  // Time Complexity: O(1).
  peek() {
    return this.head ? this.head.data : null;
  }
}
const q = new Queue();
q.enqueue(3);
q.enqueue(1);
q.enqueue(4);
q.enqueue(1);
q.enqueue(5);
console.log(q.dequeue());
console.log(q.peek());
console.log(JSON.stringify(q));

// ==== Binary Tree =====

class BinaryTree {
  constructor() {}
}

// ======= Implementation of Stack  =======

const { time } = require("console");

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

  isEmpty() {
    return this.size === 0 ? true : false;
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

// class TreeNode for stored in the node.
// It has: Left child - less than current data, and Right child - greater than current data.
class TreeNode {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

//

class BST {
  constructor() {
    this.root = null;
  }

  // Adds a new node with the given data to the BST.
  add(data) {
    const node = this.root;
    if (node === null) {
      this.root = new TreeNode(data);
      return;
    } else {
      const searchTree = function (node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new TreeNode(data);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new TreeNode(data);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }

  //   BST (binary search tree) has a specific property:

  //   For every node:
  //   left child < current node < right child
  search(data) {
    let current = this.root;

    while (current) {
      if (data === current.data) {
        return true; // Found it!
      } else if (data < current.data) {
        current = current.left; // Go left
      } else {
        current = current.right; // Go right
      }
    }

    return false; // Not found
  }

  // In-order traversal (Left → Root → Right)
  inOrder(node = this.root, result = []) {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.data);
      this.inOrder(node.right, result);
    }
    return result;
  }

  // Pre-order traversal (Root → Left → Right)
  preOrder(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.data);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  // Post-order traversal (Left → Right → Root)
  postOrder(node = this.root, result = []) {
    if (node !== null) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.data);
    }
    return result;
  }

  // find min in left subtree (most left leaf, node without children)
  _bstMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  // find max in right subtree (most right leaf, node without children)
  _bstMax(node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }

  // check if BST is valid
  isBSTValid(root = this.root) {
    // bottom of the tree reached - exit
    if (root == null) return true;

    // check the max in left subtree
    let leftMax = root.left ? this._bstMax(root.left) : -Infinity;

    // and min in right subtree
    let rightMin = root.right ? this._bstMin(root.right) : Infinity;

    // if left max greater then current node, or right min less then current node
    // bst is not valid at this point
    if (leftMax > root.data || rightMin < root.data) return false;

    // recursively check both subtrees
    let leftTree = this.isBSTValid(root.left);
    let rightTree = this.isBSTValid(root.right);

    // if both return true - bst is valid
    if (leftTree && rightTree) return true;
    return false;
  }
}

// utility function for pretty print of  the tree
function printTree(node, prefix = "", isLeft = true) {
  if (node === null) return;

  // Print right child first (so it appears on top when printed)
  if (node.right) {
    printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
  }

  // Print current node
  console.log(prefix + (isLeft ? "└── " : "┌── ") + node.data);

  // Then print left child
  if (node.left) {
    printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
  }
}
// Build a sample tree manually
const tree = new TreeNode(10, new TreeNode(5, new TreeNode(2), new TreeNode(7)), new TreeNode(15, null, new TreeNode(20)));

// bst

const root = new BST();
root.add(8);
root.add(3);
root.add(5);
root.add(9);
// Print the tree
printTree(root.root);

console.log(root.search(5));
console.log(root.search(6));

console.log(root.inOrder());
console.log(root.preOrder());
console.log(root.postOrder());

console.log("==== BST validation =====");
console.log("Given BST is valid? ", root.isBSTValid());

// ======= Linked List =======

// class ListNode contains two items: the data and the pointer to the next node
class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// class contain the link to first element of the list - head
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  // last is an element with this.next === null
  getLast() {
    let lastNode = this.head;
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
    }
    return lastNode;
  }

  // find last and put the new element as next for it
  add(newData) {
    let last = this.getLast();
    if (last) {
      last.next = new ListNode(newData);
    } else {
      this.head = new ListNode(newData);
    }
  }

  // two cases
  // 1. the element we looking for - first element. Simply reassign head to next element
  // 2. all others - we stand on current element, if next to it - that we are looking for
  // reassign the current.next to next.next element, missing the one we should delete
  delete(data) {
    let current = this.head;
    if (current.data === data) {
      current = current.next;
    }
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
      }
      current = current.next;
    }
  }

  // Floyd’s cycle detection algorithm
  detectCycle() {
    let tortoise = this.head;
    let hare = this.head;

    while (hare !== null && hare.next !== null) {
      hare = hare.next.next;
      tortoise = tortoise.next;
      if (hare === tortoise) {
        return true;
      }
    }
    return false;
  }
}

const myCoolList = new LinkedList();
myCoolList.add(5);
myCoolList.add(12);
myCoolList.add(9);
myCoolList.add(123);

// myCoolList.getLast().next = myCoolList.head;
console.log("===================");

console.log(`Cycle: ${myCoolList.detectCycle()}`);

// console.log(JSON.stringify(myCoolList));
// console.log(myCoolList.getLast());

// ==== Graph =====

// create a graph class storing graph as a structure
// defining vertex array and
// adjacent list
class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  // add vertex to the graph
  // initialize the adjacent list with a
  // null array
  addVertex(v) {
    this.AdjList.set(v, []);
  }
  // addEdge adds an edge between the src and dest.
  addEdge(src, dest) {
    this.AdjList.get(src).push(dest);

    // we suppose we have undirectional graph
    this.AdjList.get(dest).push(src);
  }

  printGraph() {
    // get all the vertices
    const get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (let i of get_keys) {
      // get the corresponding adjacency list
      // for the vertex
      let get_values = this.AdjList.get(i);
      let conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (let j of get_values) conc += j + " ";

      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }

  // BFS implementation
  bfs(startingNode) {
    // store nodes that already visited
    // key node, value boolean (true)
    let visited = {};

    // Queue, will store unvisited nodes
    const q = new Queue();

    // add the starting node to the queue
    visited[startingNode] = true;
    q.enqueue(startingNode);

    // loop until queue is empty
    while (!q.isEmpty()) {
      // get the element from the queue
      let getQueueElement = q.dequeue();

      // passing the current vertex to callback function
      console.log(getQueueElement);

      // get the adjacent list for current vertex
      let connectionList = this.AdjList.get(getQueueElement);

      // loop through the list and add the element to the
      // queue if it is not processed yet
      for (let i in connectionList) {
        let connection = connectionList[i];

        if (!visited[connection]) {
          visited[connection] = true;
          q.enqueue(connection);
        }
      }
    }
    return Object.keys(visited);
  }

  // Main DFS method
  dfs(startingNode) {
    let visited = {};

    this.DFSUtil(startingNode, visited);
    return Object.keys(visited);
  }

  // Recursive function which process and explore
  // all the adjacent vertex of the vertex with which it is called
  DFSUtil(vert, visited) {
    visited[vert] = true;
    console.log(vert);

    let get_neighbours = this.AdjList.get(vert);

    for (let i in get_neighbours) {
      let get_elem = get_neighbours[i];
      if (!visited[get_elem]) this.DFSUtil(get_elem, visited);
    }
  }
}

// Using the above implemented graph class
const g = new Graph(6);
const vertices = ["A", "B", "C", "D", "E", "F"];

// adding vertices
for (let i = 0; i < vertices.length; i++) {
  g.addVertex(vertices[i]);
}

// adding edges
g.addEdge("A", "B");
g.addEdge("A", "D");
g.addEdge("A", "E");
g.addEdge("B", "C");
g.addEdge("D", "E");
g.addEdge("E", "F");
g.addEdge("E", "C");
g.addEdge("C", "F");

g.printGraph();

console.log(g.dfs("E"));

// =====  Implement Min/Max Stack ======
//time complexity of O(1).
class MaxStack {
  constructor() {
    this.stack = [];
    this.maxEl = [];
  }

  // When the stack is empty, we insert the given element into the stack
  // and set max element (the variable storing the current maximum element).
  push(element) {
    if (this.stack.length === 0) {
      this.maxEl = element;
      this.stack.push(element);
    }

    // If new number is greater than maxEle
    else if (element > this.maxEl) {
      this.stack.push(2 * element - this.maxEl);
      this.maxEl = element;
    } else {
      this.stack.push(element);
    }
  }

  // Remove the top element from the Stack
  pop() {
    if (this.stack.length === 0) {
      return;
    }

    let top = this.stack.pop();

    // Maximum will change if the maximum element
    // of the stack is being removed.
    if (top > this.maxEl) {
      this.maxEl = 2 * this.maxEl - top;
    }
  }

  // Finds maximum element of Stack
  getMax() {
    if (this.stack.length === 0) {
      return -1;
    }

    // variable maxEle stores the maximum element
    // in the stack
    return this.maxEl;
  }
}

const st = new MaxStack();
console.log("===========Max stk=============");
st.push(2);
st.push(3);
st.pop();
console.log(st.getMax(), " ");
st.push(1);
console.log(st.getMax(), " ");

// time complexity of O(1).
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(el) {
    this.stack.push(el);
    // If the minStack is empty or the new element is smaller than
    // the top of minStack, push it onto minStack
    if (this.minStack.length === 0 || el <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(el);
    } else {
      // Otherwise, push the top element of minStack
      // again to keep the minimum unchanged
      this.minStack.push(this.minStack[this.minStack.length - 1]);
    }
  }

  // Pop the top element from the stack
  pop() {
    if (this.stack.length === 0) {
      return -1;
    }
    // Pop from both stacks
    const poppedElement = this.stack.pop();
    this.minStack.pop();
    return poppedElement;
  }

  // Get the minimum element in the stack
  getMin() {
    if (this.minStack.length === 0) {
      return -1;
    }
    return this.minStack[this.minStack.length - 1];
  }
}

const minStack = new MinStack();

minStack.push(18);
minStack.push(19);
minStack.push(29);
minStack.push(15);
minStack.push(16);
console.log("======= Min stack =========");
console.log(minStack.getMin());

// =========

class GraphWeighted {
  constructor() {
    this.AdjList = new Map();
  }

  // add vertex to the graph
  // initialize the adjacent list with a
  // null array
  addVertex(v) {
    this.AdjList.set(v, []);
  }
  // addEdge adds an edge between the src and dest.
  addEdge(src, dest, weight) {
    this.AdjList.get(src).push({ node: dest, weight });

    // we suppose we have undirectional graph
    this.AdjList.get(dest).push({ node: src, weight });
  }

  printGraph() {
    // get all the vertices
    const get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (let i of get_keys) {
      // get the corresponding adjacency list
      // for the vertex
      let get_values = this.AdjList.get(i);
      let conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (let j of get_values) conc += `${j.node}[${j.weight}]` + " ";

      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }

  // Returns shortest distances from src to all other vertices
  // I deliberately avoided the ‘minHeap’ solution because it is everywhere.
  // to better understand the algorithm.
  dijkstra(source) {
    // Create adjacency list
    const dstn = {};
    const visited = new Set();
    let current = source;

    let vertexArr = Array.from(this.AdjList.keys());
    // initialize all distances as infinity, besides 'source' = 0
    vertexArr.forEach((el) => {
      dstn[el] = Infinity;
    });
    dstn[source] = 0;

    // Process verticls
    while (visited.size !== vertexArr.length) {
      const neighbList = this.AdjList.get(current);

      // Check distans from each neighbour to current
      neighbList.forEach((element) => {
        if (!visited.has(element)) {
          if (dstn[element.node] > dstn[current] + element.weight) {
            dstn[element.node] = dstn[current] + element.weight;
          }
        }
      });
      visited.add(current);
      // filter out unvisited neighbours, to avoid visit them twice
      let unvisited = neighbList.filter((el) => !visited.has(el.node));
      // sort asc to take as next closest neigbour
      let sorted = unvisited.sort((a, b) => a.weight - b.weight);
      // take next neigbour as current, avoid the case when all visited
      current = sorted.length > 0 ? sorted[0].node : current;
    }
    return dstn;
  }
}

const gw = new GraphWeighted(6);
const verticesW = ["A", "B", "C", "D", "E", "F"];

// adding vertices
for (let i = 0; i < verticesW.length; i++) {
  gw.addVertex(verticesW[i]);
}

// adding edges
gw.addEdge("A", "B", 7);
gw.addEdge("A", "F", 9);
gw.addEdge("A", "E", 14);
gw.addEdge("B", "C", 15);
gw.addEdge("B", "F", 10);
gw.addEdge("E", "D", 9);
gw.addEdge("D", "C", 6);
gw.addEdge("C", "F", 11);

gw.printGraph();
console.log("======= dijkstra ====");
console.log(JSON.stringify(gw.dijkstra("A")));

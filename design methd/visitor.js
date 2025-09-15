// The Element interface
class Element {
  accept(visitor) {
    // This will be implemented by concrete elements
  }
}

// Concrete elements
class ElementA extends Element {
  accept(visitor) {
    visitor.visitElementA(this);
  }

  // ElementA-specific functionality
  operationA() {
    return "Operation A";
  }
}

class ElementB extends Element {
  accept(visitor) {
    visitor.visitElementB(this);
  }

  // ElementB-specific functionality
  operationB() {
    return "Operation B";
  }
}

// The Visitor interface
class Visitor {
  visitElementA(element) {
    // To be implemented by concrete visitors
  }

  visitElementB(element) {
    // To be implemented by concrete visitors
  }
}

// A concrete visitor
class ConcreteVisitor extends Visitor {
  visitElementA(element) {
    console.log(`Visiting ${element.operationA()}`);
    // Do something with ElementA
  }

  visitElementB(element) {
    console.log(`Visiting ${element.operationB()}`);
    // Do something with ElementB
  }
}
